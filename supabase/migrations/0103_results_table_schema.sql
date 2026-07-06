-- Week 4 / #103
-- Feature A/C 결과 저장 구조에 맞춰 results 테이블을 정리

do $$
begin
  if exists (
    select 1
    from information_schema.tables
    where table_schema = 'public'
      and table_name = 'style_results'
  ) and not exists (
    select 1
    from information_schema.tables
    where table_schema = 'public'
      and table_name = 'results'
  ) then
    alter table public.style_results rename to results;
  end if;
end
$$;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'results'
      and column_name = 'user_id'
  ) then
    alter table public.results rename column user_id to profile_id;
  end if;
end
$$;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'results'
      and column_name = 'selections'
  ) then
    alter table public.results rename column selections to request_payload;
  end if;
end
$$;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'results'
      and column_name = 'recommendations'
  ) then
    alter table public.results rename column recommendations to result_payload;
  end if;
end
$$;

alter table public.results
  add column if not exists result_version text default 'v1',
  add column if not exists music_recommendations jsonb default '[]'::jsonb,
  add column if not exists movie_recommendations jsonb default '[]'::jsonb,
  add column if not exists fashion_recommendations jsonb default '[]'::jsonb,
  add column if not exists updated_at timestamptz default now();

alter table public.results
  alter column profile_id drop not null,
  alter column start_domain set not null,
  alter column request_payload set not null,
  alter column result_payload set not null,
  alter column is_public set default true,
  alter column is_public set not null,
  alter column created_at set default now(),
  alter column created_at set not null,
  alter column updated_at set default now(),
  alter column updated_at set not null,
  alter column result_version set default 'v1',
  alter column result_version set not null;

alter table public.results
  drop constraint if exists results_start_domain_chk,
  drop constraint if exists results_request_payload_type_chk,
  drop constraint if exists results_result_payload_type_chk,
  drop constraint if exists results_style_label_type_chk,
  drop constraint if exists results_music_recommendations_type_chk,
  drop constraint if exists results_movie_recommendations_type_chk,
  drop constraint if exists results_fashion_recommendations_type_chk;

alter table public.results
  alter column style_label type jsonb
  using case
    when jsonb_typeof(to_jsonb(style_label)) = 'string'
      then jsonb_build_object(
        'title', style_label,
        'description', description,
        'themeColor', null,
        'mood', null
      )
    else style_label::jsonb
  end;

update public.results
set
  music_recommendations = coalesce(result_payload->'music', '[]'::jsonb),
  movie_recommendations = coalesce(result_payload->'movie', '[]'::jsonb),
  fashion_recommendations = coalesce(result_payload->'fashion', '[]'::jsonb),
  updated_at = coalesce(updated_at, created_at, now())
where true;

alter table public.results
  drop column if exists description;

alter table public.results
  add constraint results_start_domain_chk
    check (start_domain in ('music', 'movie', 'fashion')),
  add constraint results_request_payload_type_chk
    check (jsonb_typeof(request_payload) = 'object'),
  add constraint results_result_payload_type_chk
    check (jsonb_typeof(result_payload) = 'object'),
  add constraint results_style_label_type_chk
    check (jsonb_typeof(style_label) = 'object'),
  add constraint results_music_recommendations_type_chk
    check (jsonb_typeof(music_recommendations) = 'array'),
  add constraint results_movie_recommendations_type_chk
    check (jsonb_typeof(movie_recommendations) = 'array'),
  add constraint results_fashion_recommendations_type_chk
    check (jsonb_typeof(fashion_recommendations) = 'array');

create index if not exists results_profile_id_created_at_idx
  on public.results (profile_id, created_at desc);

create index if not exists results_public_created_at_idx
  on public.results (is_public, created_at desc);

drop trigger if exists on_results_updated on public.results;

create trigger on_results_updated
  before update on public.results
  for each row execute procedure public.handle_updated_at();
