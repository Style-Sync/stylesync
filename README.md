# 🎵 StyleSync

> 하나의 취향에서 시작해 세 개의 세계로 연결되는 크로스 도메인 추천 플랫폼

음악 × 영화/시리즈 × 패션 중 하나를 입력하면 AI가 나머지 두 도메인을 크로스 추론해서 추천해줍니다.

---

## 서비스 소개

| 시작 도메인 | 추천 1 | 추천 2 | 스타일 레이블 예시 |
|------------|--------|--------|-----------------|
| 🎵 음악 | 🎬 영화/시리즈 | 👗 패션 | Melancholic Softboy |
| 🎬 영화/시리즈 | 🎵 음악 | 👗 패션 | Quiet Cinephile |
| 👗 패션 | 🎵 음악 | 🎬 영화/시리즈 | Solar Punk Dresser |

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| 프레임워크 | Next.js 14 (App Router) |
| 언어 | TypeScript |
| 스타일링 | TailwindCSS + Shadcn/ui |
| 상태관리 | Zustand |
| 백엔드/DB | Supabase (Auth, PostgreSQL) |
| AI 추론 | Grok AI |
| 음악 데이터 | Spotify Web API |
| 영상 데이터 | TMDB API |
| 패션 데이터 | 네이버 쇼핑 API |
| 패키지 매니저 | pnpm |
| 배포 | Vercel |

---

## 시작하기

### 요구 환경

- Node.js `v22.15.1`
- pnpm `v10.33.0`

### 설치

```bash
# 저장소 클론
git clone https://github.com/Style-Sync/stylesync.git
cd stylesync

# 패키지 설치
pnpm install

# 환경변수 설정
cp .env.example .env.local
# .env.local 파일에 API 키 입력
```

### 환경변수

`.env.local` 파일에 아래 값을 입력하세요.

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# AI
GROK_API_KEY=

# Spotify
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=

# TMDB
TMDB_API_KEY=

# 네이버 쇼핑
NAVER_CLIENT_ID=
NAVER_CLIENT_SECRET=
```

### 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

---

## 주요 명령어

```bash
pnpm dev            # 개발 서버 실행 (localhost:3000)
pnpm build          # 프로덕션 빌드
pnpm start          # 프로덕션 서버 실행
pnpm lint           # ESLint 검사
pnpm lint:fix       # ESLint 자동 수정
pnpm format         # Prettier 포맷
pnpm type-check     # TypeScript 타입 체크
pnpm storybook      # 스토리북 실행 (localhost:6006)
```

---

## 프로젝트 구조

```
src/
├── app/                  # Next.js App Router 페이지 및 API
│   ├── select/           # 도메인 선택 페이지
│   ├── taste/[domain]/   # 취향 입력 페이지
│   ├── loading-result/   # AI 분석 로딩 페이지
│   ├── result/[id]/      # 결과 페이지
│   ├── (auth)/           # 로그인 / 회원가입
│   ├── profile/          # 유저 프로필
│   └── api/              # API 라우트
├── components/
│   ├── ui/               # 공통 UI 컴포넌트
│   ├── domain/           # 도메인별 카드 컴포넌트
│   ├── result/           # 결과 페이지 컴포넌트
│   ├── mascot/           # 마스코트 컴포넌트
│   └── layout/           # 레이아웃 컴포넌트
├── lib/                  # 외부 API 클라이언트
├── store/                # Zustand 상태 관리
├── types/                # TypeScript 타입 정의
├── hooks/                # 커스텀 훅
└── styles/               # 전역 스타일
```

---

## 브랜치 전략

| 브랜치 | 설명 |
|--------|------|
| `main` | 프로덕션 배포 버전 |
| `dev` | 기본 개발 브랜치 |
| `SS-{번호}-{기능명}` | 기능 개발 브랜치 |
| `ISSUE-{번호}-{이슈명}` | 이슈 수정 브랜치 |
| `HOTFIX-{번호}-{내용}` | 긴급 수정 브랜치 |

> 자세한 내용은 [CONVENTION.md](./CONVENTION.md)를 참고하세요.

---

## 기여하기

1. `dev` 브랜치에서 작업 브랜치 생성 (`SS-{번호}-{기능명}`)
2. 작업 완료 후 PR 생성
3. 팀원 최소 1명 Approve 후 `dev`에 병합

---

## 라이선스

본 프로젝트는 팀 내부 프로젝트로 외부 배포를 허용하지 않습니다.
