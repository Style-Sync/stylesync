-- Week 4 / #102
-- profiles 테이블을 실제 사용자 프로필 저장 구조에 맞게 보강

alter table public.profiles
  add column if not exists display_name text,
  add column if not exists avatar_url text,
  add column if not exists website_url text;

update public.profiles
set
  username = lower(trim(username)),
  display_name = coalesce(display_name, username)
where true;

alter table public.profiles
  alter column username set not null,
  alter column visibility set default 'public',
  alter column visibility set not null,
  alter column created_at set default now(),
  alter column created_at set not null,
  alter column updated_at set default now(),
  alter column updated_at set not null;

alter table public.profiles
  drop constraint if exists profiles_username_length_chk,
  drop constraint if exists profiles_username_format_chk,
  drop constraint if exists profiles_bio_length_chk,
  drop constraint if exists profiles_display_name_length_chk,
  drop constraint if exists profiles_website_url_chk;

alter table public.profiles
  add constraint profiles_username_length_chk
    check (char_length(username) between 3 and 30),
  add constraint profiles_username_format_chk
    check (username ~ '^[a-z0-9_]+$'),
  add constraint profiles_bio_length_chk
    check (bio is null or char_length(bio) <= 160),
  add constraint profiles_display_name_length_chk
    check (display_name is null or char_length(display_name) between 1 and 40),
  add constraint profiles_website_url_chk
    check (
      website_url is null
      or website_url ~ '^https?://'
    );

create or replace function public.normalize_username(seed text, fallback_user_id uuid)
returns text
language plpgsql
immutable
as $$
declare
  normalized text;
begin
  normalized := lower(trim(coalesce(seed, '')));
  normalized := regexp_replace(normalized, '[^a-z0-9_]+', '_', 'g');
  normalized := trim(both '_' from normalized);

  if normalized = '' then
    normalized := 'user_' || replace(substr(fallback_user_id::text, 1, 8), '-', '');
  end if;

  return left(normalized, 30);
end;
$$;

update public.profiles
set username = public.normalize_username(username, id)
where true;

update public.profiles
set display_name = coalesce(display_name, username)
where display_name is null;

create or replace function public.handle_new_user()
returns trigger as $$
declare
  base_username text;
begin
  base_username := coalesce(
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'nickname',
    split_part(new.email, '@', 1),
    'user_' || substr(new.id::text, 1, 8)
  );

  insert into public.profiles (
    id,
    username,
    display_name
  )
  values (
    new.id,
    public.normalize_username(base_username, new.id),
    coalesce(new.raw_user_meta_data->>'nickname', base_username)
  );

  return new;
end;
$$ language plpgsql security definer;
