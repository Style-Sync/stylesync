-- #130
-- 유사도 검색 RPC 함수

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
  join (
    select embedding
    from results
    where id = target_id
      and embedding is not null
  ) t on true
  where r.embedding is not null
    and r.is_public = true
    and r.id != target_id
  order by r.embedding <=> t.embedding
  limit match_count;
$$;
