-- #299
-- 유사도 검색 RPC(match_results / match_users)에 작성자 profiles.visibility 반영
--
-- 배경: 두 함수는 results.is_public = true 만 필터해서, 프로필을 'followers'로 설정한
-- 사용자의 결과가 팔로워가 아닌 호출자에게도 유사검색에 노출될 수 있었다.
-- (피드 #289 / 프로필 #279는 이미 visibility를 반영. RPC만 남아 있었음 — #290 후속)
--
-- 정책: is_public = true 이고 && 작성자 프로필이 호출자에게 열람 가능할 때만 반환.
--   public    → 전체 노출
--   followers → 호출자가 팔로워일 때만 (auth.uid() 기준)
--   private   → 제외 (이미 #290 kill-switch로 is_public=false가 되지만 방어적으로도 제외됨)
--
-- 두 함수 모두 language sql / SECURITY INVOKER 이므로 PostgREST RPC 호출 시 auth.uid()가
-- 호출자를 가리킨다. anon 호출(match_results)에서는 auth.uid()가 null → followers 분기 false
-- → public 결과만 노출된다.

create or replace function public.match_results(
  target_id uuid,
  match_count int default 10
)
returns table (
  id uuid,
  style_label jsonb,
  start_domain text,
  created_at timestamptz,
  similarity float
)
language sql
stable
as $$
  select
    r.id,
    r.style_label,
    r.start_domain,
    r.created_at,
    1 - (r.embedding <=> t.embedding) as similarity
  from results r
  join profiles p on p.id = r.profile_id
  join (
    select embedding
    from results
    where id = target_id
      and embedding is not null
  ) t on true
  where r.embedding is not null
    and r.is_public = true
    and r.id != target_id
    and (
      p.visibility = 'public'
      or (
        p.visibility = 'followers'
        and exists (
          select 1
          from follows f
          where f.following_id = p.id
            and f.follower_id = auth.uid()
        )
      )
    )
  order by r.embedding <=> t.embedding
  limit match_count;
$$;

create or replace function public.match_users(
  target_user_id uuid,
  match_count int default 10
)
returns table (
  profile_id uuid,
  username text,
  display_name text,
  similarity float
)
language sql
stable
as $$
  select
    p.id as profile_id,
    p.username,
    p.display_name,
    avg(1 - (r.embedding <=> t.embedding))::float as similarity
  from results r
  join profiles p on p.id = r.profile_id
  cross join lateral (
    select embedding
    from results
    where profile_id = target_user_id
      and embedding is not null
    order by created_at desc
    limit 1
  ) t
  where r.embedding is not null
    and r.is_public = true
    and r.profile_id != target_user_id
    and (
      p.visibility = 'public'
      or (
        p.visibility = 'followers'
        and exists (
          select 1
          from follows f
          where f.following_id = p.id
            and f.follower_id = auth.uid()
        )
      )
    )
  group by p.id, p.username, p.display_name
  order by similarity desc
  limit match_count;
$$;

-- EXECUTE 권한 재확인 (0111과 동일 — create or replace가 ACL을 보존하지만 방어적으로 명시)
revoke all on function public.match_results(uuid, int) from public;
grant execute on function public.match_results(uuid, int) to anon, authenticated;

revoke all on function public.match_users(uuid, int) from public;
grant execute on function public.match_users(uuid, int) to authenticated;
