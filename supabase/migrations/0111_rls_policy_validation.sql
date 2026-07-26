-- #122
-- RLS 정책 검증 및 RPC 함수 실행 권한 명시적 설정
--
-- 검증 항목:
-- 1. profiles  : public_read, owner_read, followers_read, insert_self, update_self ✓
-- 2. results   : public_read, owner_read, insert_self, update_self, delete_self ✓
-- 3. follows   : read_authenticated, insert_self, delete_self ✓
-- 4. RPC 함수  : match_results / match_users EXECUTE 권한 (0109/0110에서 누락)

-- match_results: anon도 공개 결과 유사도 검색 가능
revoke all on function public.match_results(uuid, int) from public;
grant execute on function public.match_results(uuid, int) to anon, authenticated;

-- match_users: 인증 사용자만 유사 사용자 조회 가능
revoke all on function public.match_users(uuid, int) from public;
grant execute on function public.match_users(uuid, int) to authenticated;
