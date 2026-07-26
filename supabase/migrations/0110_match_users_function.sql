-- #120
-- 유사 스타일 사용자 조회 RPC 함수
-- target 사용자의 최신 result embedding과 다른 사용자들의 평균 유사도로 순위 산정

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
  group by p.id, p.username, p.display_name
  order by similarity desc
  limit match_count;
$$;
