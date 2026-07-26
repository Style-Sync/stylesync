# StyleSync 배포 전 릴리즈 체크리스트

> 이 문서는 `main` 브랜치 배포(Vercel Production) 전에 반드시 확인해야 하는 항목들을 정의합니다.
> 각 항목을 확인한 담당자가 `[x]`로 체크하고, PR 본문 또는 릴리즈 노트에 링크합니다.

---

## 1. 빌드 / 타입 / 린트

| # | 항목 | 명령어 | 담당 |
|---|------|--------|------|
| 1.1 | TypeScript 타입 에러 없음 | `pnpm type-check` | Feature A |
| 1.2 | ESLint 경고·에러 없음 | `pnpm lint` | 전체 |
| 1.3 | Production 빌드 성공 | `pnpm build` | 전체 |

## 2. 환경 변수

> Vercel Dashboard → Project → Settings → Environment Variables 에서 확인.
> 자세한 등록 방법은 [docs/vercel-preview-env.md](./vercel-preview-env.md) 참고.

| # | 변수명 | 용도 | 공개 여부 |
|---|--------|------|----------|
| 2.1 | `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL | 클라이언트 노출 OK (공개값) |
| 2.2 | `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase Anon Key | 클라이언트 노출 OK (공개값) |
| 2.3 | `NEXT_PUBLIC_SITE_URL` | 운영 도메인 URL | 클라이언트 노출 OK |
| 2.4 | `SUPABASE_SERVICE_ROLE_KEY` | Supabase 서버 관리 키 | **서버 전용** — NEXT_PUBLIC_ 금지 |
| 2.5 | `GROK_API_KEY` | Grok AI 추론 키 | **서버 전용** — NEXT_PUBLIC_ 금지 |
| 2.6 | `SPOTIFY_CLIENT_ID` | Spotify 아티스트 검색 | **서버 전용** — NEXT_PUBLIC_ 금지 |
| 2.7 | `SPOTIFY_CLIENT_SECRET` | Spotify OAuth 시크릿 | **서버 전용** — NEXT_PUBLIC_ 금지 |
| 2.8 | `TMDB_API_KEY` | TMDB 영화 검색 | **서버 전용** — NEXT_PUBLIC_ 금지 |
| 2.9 | `UNSPLASH_ACCESS_KEY` | Unsplash 패션 이미지 | **서버 전용** — NEXT_PUBLIC_ 금지 |

- [ ] 위 모든 환경변수가 Vercel Production 환경에 등록됨
- [ ] 서버 전용 키(2.4~2.9)가 `NEXT_PUBLIC_` 접두사 없이 등록됨
- [ ] `NEXT_PUBLIC_SITE_URL`이 운영 도메인(`https://stylesync.vercel.app` 또는 커스텀 도메인)으로 설정됨

## 3. 보안 / 개인정보

- [ ] 서버 전용 API 키(`GROK_API_KEY`, `SPOTIFY_CLIENT_*`, `TMDB_API_KEY`, `UNSPLASH_ACCESS_KEY`)가 클라이언트 번들에 포함되지 않음
  - 확인 방법: `pnpm build` → `.next/static/` 내 JS 파일에서 키값 검색
- [ ] 전화번호·주민등록번호 등 민감 개인정보를 수집·저장하지 않음
- [ ] 사용자 취향 데이터가 Supabase RLS 정책에 의해 본인만 접근 가능함
- [ ] 자동 결제·구매 기능이 존재하지 않음

## 4. 핵심 사용자 플로우 QA

아래 플로우를 **Preview URL** 또는 **Production URL**에서 직접 실행하며 확인합니다.

| # | 플로우 | 확인 항목 |
|---|--------|----------|
| 4.1 | 음악 E2E | `/select` → `/taste/music` → 스타일 선택 → 아티스트 3개 선택 → 분석 → `/result/{id}` 정상 렌더 |
| 4.2 | 영화 E2E | `/select` → `/taste/movie` → 스타일 선택 → 영화 3개 선택 → 분석 → `/result/{id}` 정상 렌더 |
| 4.3 | 패션 E2E | `/select` → `/taste/fashion` → 스타일 선택 → 분석 → `/result/{id}` 정상 렌더 |
| 4.4 | 결과 공유 | 결과 페이지 "Instagram 공유" / "Twitter 공유" 버튼 표시 확인 |
| 4.5 | API 오류 | GROK_API_KEY 없는 환경에서 분석 시 에러 메시지 인라인 노출 확인 (앱 중단 없음) |
| 4.6 | 비로그인 | 비로그인 상태에서 결과 페이지 접근 가능, "Google로 시작하기" CTA 표시 |

- [ ] 4.1 음악 E2E 통과
- [ ] 4.2 영화 E2E 통과
- [ ] 4.3 패션 E2E 통과
- [ ] 4.4 결과 공유 확인
- [ ] 4.5 API 오류 처리 확인
- [ ] 4.6 비로그인 플로우 확인

## 5. 모바일 레이아웃

| # | 항목 |
|---|------|
| 5.1 | 390px(iPhone 14) 기준 전체 플로우 레이아웃 깨짐 없음 |
| 5.2 | 결과 페이지 카드 가로 스크롤 정상 동작 |
| 5.3 | BottomNav 버튼 터치 영역 충분함 |

- [ ] Chrome DevTools → iPhone 14 Pro 모드에서 위 항목 확인

## 6. Smoke Test (배포 직후)

- [ ] 홈(`/`) 또는 진입점 URL 200 응답
- [ ] `/select` 페이지 정상 렌더
- [ ] `/api/inference` POST → 유효 요청에 200 응답 (GROK_API_KEY 유효한 경우)
- [ ] `/api/spotify`, `/api/tmdb` 검색 API 200 응답
- [ ] Vercel Functions 로그에 초기 에러 없음

## 릴리즈 기록

| 날짜 | 버전 | 담당자 | 비고 |
|------|------|--------|------|
| — | v0.1.0 | — | 초기 릴리즈 |
