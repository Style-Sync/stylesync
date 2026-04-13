-- StyleSync 초기 스키마 v1.0

-- 유저 프로필 (Supabase Auth users 확장)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  bio text,
  avatar_style_label text,
  visibility text default 'public' check (visibility in ('public', 'followers', 'private')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 분석 결과
create table if not exists public.style_results (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  start_domain text not null check (start_domain in ('music', 'movie', 'fashion')),
  style_label text not null,
  description text not null,
  selections jsonb not null,         -- 사용자 입력 취향 데이터
  recommendations jsonb not null,    -- AI 추론 결과 (음악/영화/패션)
  is_public boolean default true,
  created_at timestamptz default now()
);

-- 팔로우 관계
create table if not exists public.follows (
  follower_id uuid references public.profiles(id) on delete cascade,
  following_id uuid references public.profiles(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (follower_id, following_id)
);

-- RLS (Row Level Security) 활성화
alter table public.profiles enable row level security;
alter table public.style_results enable row level security;
alter table public.follows enable row level security;

-- profiles 정책
create policy "공개 프로필 조회 가능" on public.profiles
  for select using (visibility = 'public' or auth.uid() = id);

create policy "본인 프로필 수정 가능" on public.profiles
  for update using (auth.uid() = id);

create policy "회원가입 시 프로필 생성" on public.profiles
  for insert with check (auth.uid() = id);

-- style_results 정책
create policy "공개 결과 조회 가능" on public.style_results
  for select using (is_public = true or auth.uid() = user_id);

create policy "본인 결과 삽입 가능" on public.style_results
  for insert with check (auth.uid() = user_id or user_id is null);

create policy "본인 결과 수정/삭제 가능" on public.style_results
  for update using (auth.uid() = user_id);

create policy "본인 결과 삭제 가능" on public.style_results
  for delete using (auth.uid() = user_id);

-- follows 정책
create policy "팔로우 관계 조회" on public.follows
  for select using (true);

create policy "팔로우 추가" on public.follows
  for insert with check (auth.uid() = follower_id);

create policy "팔로우 취소" on public.follows
  for delete using (auth.uid() = follower_id);

-- 자동 updated_at 트리거
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_profiles_updated
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

-- 신규 유저 프로필 자동 생성 트리거
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', 'user_' || substr(new.id::text, 1, 8))
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
