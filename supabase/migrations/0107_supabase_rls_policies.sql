-- Week 4 / #107
-- public 스키마 노출 테이블 RLS 정책을 명시적으로 재정의

grant usage on schema public to anon, authenticated;

grant select on public.profiles to anon, authenticated;
grant insert, update on public.profiles to authenticated;

grant select on public.style_results to anon, authenticated;
grant insert, update, delete on public.style_results to authenticated;

grant select on public.follows to authenticated;
grant insert, delete on public.follows to authenticated;

alter table public.profiles enable row level security;
alter table public.style_results enable row level security;
alter table public.follows enable row level security;

drop policy if exists "공개 프로필 조회 가능" on public.profiles;
drop policy if exists "본인 프로필 수정 가능" on public.profiles;
drop policy if exists "회원가입 시 프로필 생성" on public.profiles;
drop policy if exists "profiles_public_read" on public.profiles;
drop policy if exists "profiles_owner_read" on public.profiles;
drop policy if exists "profiles_followers_read" on public.profiles;
drop policy if exists "profiles_insert_self" on public.profiles;
drop policy if exists "profiles_update_self" on public.profiles;

create policy "profiles_public_read"
  on public.profiles
  for select
  to anon, authenticated
  using (visibility = 'public');

create policy "profiles_owner_read"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() is not null and auth.uid() = id);

create policy "profiles_followers_read"
  on public.profiles
  for select
  to authenticated
  using (
    visibility = 'followers'
    and auth.uid() is not null
    and exists (
      select 1
      from public.follows
      where follows.follower_id = auth.uid()
        and follows.following_id = profiles.id
    )
  );

create policy "profiles_insert_self"
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() is not null and auth.uid() = id);

create policy "profiles_update_self"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() is not null and auth.uid() = id)
  with check (auth.uid() is not null and auth.uid() = id);

drop policy if exists "공개 결과 조회 가능" on public.style_results;
drop policy if exists "본인 결과 삽입 가능" on public.style_results;
drop policy if exists "본인 결과 수정/삭제 가능" on public.style_results;
drop policy if exists "본인 결과 삭제 가능" on public.style_results;
drop policy if exists "style_results_public_read" on public.style_results;
drop policy if exists "style_results_owner_read" on public.style_results;
drop policy if exists "style_results_insert_self" on public.style_results;
drop policy if exists "style_results_update_self" on public.style_results;
drop policy if exists "style_results_delete_self" on public.style_results;

create policy "style_results_public_read"
  on public.style_results
  for select
  to anon, authenticated
  using (is_public = true);

create policy "style_results_owner_read"
  on public.style_results
  for select
  to authenticated
  using (auth.uid() is not null and auth.uid() = user_id);

create policy "style_results_insert_self"
  on public.style_results
  for insert
  to authenticated
  with check (auth.uid() is not null and auth.uid() = user_id);

create policy "style_results_update_self"
  on public.style_results
  for update
  to authenticated
  using (auth.uid() is not null and auth.uid() = user_id)
  with check (auth.uid() is not null and auth.uid() = user_id);

create policy "style_results_delete_self"
  on public.style_results
  for delete
  to authenticated
  using (auth.uid() is not null and auth.uid() = user_id);

drop policy if exists "팔로우 관계 조회" on public.follows;
drop policy if exists "팔로우 추가" on public.follows;
drop policy if exists "팔로우 취소" on public.follows;
drop policy if exists "follows_read_authenticated" on public.follows;
drop policy if exists "follows_insert_self" on public.follows;
drop policy if exists "follows_delete_self" on public.follows;

create policy "follows_read_authenticated"
  on public.follows
  for select
  to authenticated
  using (auth.uid() is not null);

create policy "follows_insert_self"
  on public.follows
  for insert
  to authenticated
  with check (auth.uid() is not null and auth.uid() = follower_id);

create policy "follows_delete_self"
  on public.follows
  for delete
  to authenticated
  using (auth.uid() is not null and auth.uid() = follower_id);
