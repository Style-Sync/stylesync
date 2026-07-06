# Vercel Preview Environment Variables

StyleSync Preview 배포에서 필요한 환경변수 등록 가이드입니다.

## 목적

- PR 단위 Preview 배포에서도 로그인, 추천 API, 외부 연동이 동일하게 동작하도록 맞춥니다.
- 로컬 `.env.local` 기준과 Vercel Preview 기준을 같은 키 이름으로 유지합니다.

## 등록 위치

1. Vercel Dashboard에서 `stylesync` 프로젝트를 엽니다.
2. `Settings` → `Environment Variables` 로 이동합니다.
3. 각 변수를 추가할 때 `Preview` 환경을 반드시 포함합니다.

## 등록할 변수

### Public

```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

### Server-only

```env
SUPABASE_SERVICE_ROLE_KEY=
GROK_API_KEY=
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
TMDB_API_KEY=
UNSPLASH_ACCESS_KEY=
```

## 권장 값

- `NEXT_PUBLIC_SITE_URL`
  - Preview 전용 도메인을 사용하거나, 비워두지 말고 현재 Preview 배포 URL 규칙에 맞춰 설정합니다.
- `NEXT_PUBLIC_SUPABASE_URL`
  - 팀 공용 Supabase 프로젝트 URL을 사용합니다.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
  - Supabase API 설정의 publishable key를 사용합니다.
- `SUPABASE_SERVICE_ROLE_KEY`
  - 서버 전용입니다. 브라우저 노출 금지입니다.
- `SPOTIFY_CLIENT_SECRET`, `GROK_API_KEY`, `TMDB_API_KEY`, `UNSPLASH_ACCESS_KEY`
  - 모두 서버 전용 시크릿으로 등록합니다.

## 등록 순서 체크리스트

1. `.env.example` 기준으로 키 이름이 일치하는지 확인합니다.
2. `Preview` 환경 체크 여부를 확인합니다.
3. 필요 시 `Production`, `Development`도 함께 체크합니다.
4. 저장 후 최신 PR에서 Preview Deployment를 다시 배포합니다.
5. `/login`, `/signup`, 추천 API 경로가 정상 동작하는지 확인합니다.

## 주의 사항

- `NEXT_PUBLIC_SUPABASE_ANON_KEY`는 레거시 호환용입니다. 신규 세팅은 `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`를 우선 사용합니다.
- 값 변경 후 Preview가 이전 값을 계속 쓰면 `Redeploy`로 새 배포를 올립니다.
- 시크릿 값은 PR 본문, 이슈, 스크린샷에 남기지 않습니다.
