-- #122
-- RLS 정책 검증 및 RPC 함수 실행 권한 명시적 설정
--
-- "검증"을 주석 체크마크가 아니라 실행 가능한 assertion으로 수행한다.
-- 아래 DO 블록은 (1) 세 테이블의 RLS 활성화 여부와 (2) 0107에서 정의한 정책 13개가
-- pg_policies에 실제로 존재하는지 확인하고, 하나라도 없으면 예외를 던져 마이그레이션을 실패시킨다.
-- 이 마이그레이션이 통과했다는 것 자체가 정책이 적용돼 있다는 검증 근거가 된다.
--
-- 핵심 검증 결과 (pg_policies USING 절 기준, 0107):
--   results.results_public_read : USING (is_public = true)          ← 전체 공개 아님. is_public=true 행만 조회 가능
--   results.results_owner_read  : USING (auth.uid() = profile_id)
--   profiles.profiles_public_read : USING (visibility = 'public')
--   → 저장 기본값 비공개(#278: insert 시 is_public=false)와 결합하면 저장 결과는 소유자만 조회 가능.

do $$
declare
  expected record;
  missing text[] := '{}';
  tbl text;
begin
  -- 1) RLS 활성화 검증
  foreach tbl in array array['profiles', 'results', 'follows'] loop
    if not exists (
      select 1 from pg_tables
      where schemaname = 'public' and tablename = tbl and rowsecurity = true
    ) then
      raise exception 'RLS가 public.% 에 활성화되어 있지 않습니다', tbl;
    end if;
  end loop;

  -- 2) 정책 존재 검증 (0107에서 정의한 13개)
  for expected in
    select * from (values
      ('profiles', 'profiles_public_read'),
      ('profiles', 'profiles_owner_read'),
      ('profiles', 'profiles_followers_read'),
      ('profiles', 'profiles_insert_self'),
      ('profiles', 'profiles_update_self'),
      ('results',  'results_public_read'),
      ('results',  'results_owner_read'),
      ('results',  'results_insert_self'),
      ('results',  'results_update_self'),
      ('results',  'results_delete_self'),
      ('follows',  'follows_read_authenticated'),
      ('follows',  'follows_insert_self'),
      ('follows',  'follows_delete_self')
    ) as t(tablename, policyname)
  loop
    if not exists (
      select 1 from pg_policies
      where schemaname = 'public'
        and tablename = expected.tablename
        and policyname = expected.policyname
    ) then
      missing := array_append(missing, expected.tablename || '.' || expected.policyname);
    end if;
  end loop;

  if array_length(missing, 1) is not null then
    raise exception '누락된 RLS 정책: %', array_to_string(missing, ', ');
  end if;

  raise notice 'RLS 검증 통과: profiles(5) / results(5) / follows(3) 정책 및 RLS 활성화 확인됨';
end $$;

-- RPC 함수 EXECUTE 권한 (0109/0110에서 누락되어 명시)
-- match_results: anon도 공개 결과 유사도 검색 가능
revoke all on function public.match_results(uuid, int) from public;
grant execute on function public.match_results(uuid, int) to anon, authenticated;

-- match_users: 인증 사용자만 유사 사용자 조회 가능
revoke all on function public.match_users(uuid, int) from public;
grant execute on function public.match_users(uuid, int) to authenticated;
