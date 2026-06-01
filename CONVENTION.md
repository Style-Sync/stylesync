# StyleSync 팀 컨벤션

> v1.0 · 2026.04 · FE 3~4인 팀

---

## 협업 원칙

**To Do**
- 모든 PR은 팀원들과 사전/사후 대화를 통해 진행합니다.
- 팀원들 간 이견이 발생하면 다수결로 진행합니다.
- 이해가 되지 않는 부분은 언제든 질문합니다. 질문을 부담스러워하지 않습니다.
- 각자의 작업 진행 상황은 정기적으로 공유해 팀 전체가 맥락을 이해할 수 있도록 합니다.
- 코드 리뷰는 일방적인 피드백보다 "대화" 중심으로 이뤄집니다.
- 기획, 디자인, 개발 간의 경계를 최소화하고, 아이디어는 누구든 제안할 수 있습니다.
- 건강 문제 등 부득이한 상황 발생 시 사전에 팀원들에게 알리고 양해를 구합니다.
- `TASK/FEATURE` 이슈가 올라오면 작업하던 것을 잠시 멈추고 이슈 해결부터 합니다.

**Not To Do**
- 팀원들과 논의 없이 push나 merge를 하지 않습니다.
- 정해진 시간 약속을 지키며, 부득이한 경우엔 사전에 공유합니다.
- 개인적인 감정이 담긴 피드백은 지양하며, 언제나 건설적인 방향으로 의견을 주고받습니다.
- 다른 팀원의 작업을 무단으로 수정하거나 덮어쓰지 않고, 변경이 필요한 경우 먼저 공유합니다.

---

## 브랜치 전략

GitHub Projects 이슈 번호를 기준으로 브랜치를 관리합니다.

| 종류 | 패턴 | 병합 대상 | 예시 |
|------|------|----------|------|
| `main` | `main` | — | 프로덕션 배포 버전 |
| `develop` | `dev` | — | GitHub 기본 브랜치 |
| `feature` | `SS-{번호}-{기능명(PascalCase)}` | `dev` | `SS-12-DomainSelectCard` |
| `issue` | `ISSUE-{번호}-{이슈명(PascalCase)}` | `dev` | `ISSUE-5-FixTailwindClasses` |
| `hotfix` | `HOTFIX-{번호}-{내용(PascalCase)}` | `main` | `HOTFIX-911-OptimizeStateTransfer` |

> `SS-{번호}` 는 GitHub Projects에서 발급된 이슈 번호를 사용합니다.

---

## 작업 흐름

```
main
 └── dev (기본 개발 브랜치)
      ├── SS-12-DomainSelectCard   (기능 개발)
      ├── ISSUE-5-FixTailwindClasses  (버그 수정)
      └── ...

hotfix → main (긴급 수정)
```

1. `dev` 브랜치에서 작업 브랜치 생성
2. 작업 완료 후 `dev`로 PR 생성
3. 팀원 최소 1명 Approve 후 병합
4. 배포 시 `dev` → `main` PR

---

## 커밋 메시지 규칙

```
{타입}: {제목 — 70자 이내, 끝에 . 금지}

- 변경 내용 1
- 변경 내용 2
```

본문은 맥락/설명이 필요한 경우에만 작성합니다.

### 커밋 타입

| 타입 | 설명 |
|------|------|
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `docs` | 문서 변경 |
| `style` | 코드 스타일 변경 (기능 영향 없음) |
| `refactor` | 코드 리팩토링 |
| `test` | 테스트 코드 추가/수정 |
| `chore` | 환경 설정, 빌드, 보조 도구 변경 |
| `init` | 프로젝트 초기화 |
| `build` | 빌드 관련 변경사항 |
| `ci` | CI 설정 파일 변경 |
| `merge` | 브랜치 병합 |
| `schema` | DB 스키마 변경 |
| `migration` | DB 마이그레이션 SQL 저장 |
| `release` | 버전 배포 — **main 브랜치 PR 전 최종 커밋에만 사용** |

### 커밋 예시

```bash
feat: 도메인 선택 카드 컴포넌트 구현

- DomainSelectCard UI 구현
- hover 인터랙션 추가
- Zustand 도메인 선택 상태 연결
```

```bash
fix: Spotify preview_url null 케이스 fallback 처리
```

```bash
release: v0.1.0 버전 배포

- 도메인 선택 UI 완성
- Spotify API 연동
```

---

## PR 규칙

- 긴급 상황이 아니라면 **본인 제외 최소 1명의 Approve** 후 병합합니다.
- **Comment**: 코드 외 리뷰 (동작 확인, 링크 체크, 디자인 제안)
- **Review**: 코드 관련 대부분의 경우 — `Start a review`로 임시저장 후 한 번에 제출

### PR 제목 형식

```
{타입} / {브랜치명} - {작업 내용 요약}

예) feat / SS-12-DomainSelectCard - 도메인 선택 카드 UI 구현
```

### PR 본문 템플릿

```markdown
## 반영 브랜치
SS-12-DomainSelectCard → dev

## PR 타입
- [ ] 기능 추가
- [ ] 기능 삭제
- [ ] 버그 수정
- [ ] 의존성, 환경 변수, 빌드 관련 업데이트

## 작업 내용
<!-- 이번 PR에서 작업한 내용을 간략히 설명해주세요 (이미지 첨부 가능) -->

## 테스트 결과 (선택)
<!-- 스크린샷, GIF, 동작 확인 내용 -->

## 스크린샷 (선택)

## 리뷰 요구사항 (선택)
<!-- 특별히 봐주었으면 하는 부분 -->
```

---

## 네이밍 규칙

### 변수 / 함수

| 대상 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트, 클래스, 타입 | PascalCase | `DomainSelectCard`, `StyleResult` |
| 인터페이스 | `I` 접두사 + PascalCase | `IButtonProps`, `IStyleResult` |
| 훅 함수 | `use` 접두사 + camelCase | `useSpotify`, `useTMDB` |
| 그 외 변수/함수 | camelCase | `selectedDomain`, `fetchArtist` |

### 파일 이름

| 대상 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트 | PascalCase | `DomainSelectCard.tsx` |
| 컴포넌트 타입/인터페이스 | `{컴포넌트명}.types.ts` | `button.types.ts` |
| 컴포넌트 스타일 variants | `{컴포넌트명}.variants.ts` | `button.variants.ts` |
| 훅 | camelCase (`use` 접두사) | `useSpotify.ts` |
| 라우팅 폴더, 정적 파일 | kebab-case | `loading-result/`, `og-image.png` |
| 동적 라우팅 폴더 | camelCase | `[domain]/`, `[username]/` |
| 그 외 | camelCase | `tasteStore.ts`, `supabase.ts` |
| 역할이 긴 파일 | dot notation | `createTodo.usecase.ts`, `todo.test.ts` |

### 컴포넌트 폴더 구조

컴포넌트 폴더는 아래 구조를 기준으로 작성합니다.

```
src/components/ui/button/
├── Button.tsx           ← 컴포넌트 본체
├── button.types.ts      ← interface (I 접두사) 정의
├── button.variants.ts   ← 스타일 variants 객체
├── button.stories.tsx   ← Storybook
└── index.ts             ← 전체 re-export
```

```typescript
// button.types.ts — interface는 반드시 I 접두사
export interface IButtonProps {
  variant?: "primary" | "dark" | "light";
  children: React.ReactNode;
  disabled?: boolean;
}

// button.variants.ts — Tailwind 클래스 변형 모음
export const buttonVariants: Record<"primary" | "dark" | "light", string> = {
  primary: "bg-primary-container text-white cta-glow",
  dark: "bg-on-background text-white",
  light: "bg-white text-on-background border border-black/5",
};

// index.ts — 컴포넌트, 타입, variants 모두 re-export
export { Button } from "./Button";
export type { IButtonProps } from "./button.types";
export { buttonVariants } from "./button.variants";
```

> `interface` → 반드시 `I` 접두사. `type` 별칭(union, primitive 등)은 접두사 없이 PascalCase 유지.

### HTML 클래스 & ID

- **커스텀 CSS 클래스/ID**: `snake_case`
- **Tailwind 유틸리티 클래스**: 그대로 사용 (kebab-case)
- 커스텀 클래스는 `globals.css`에만 정의합니다.

---

## 함수 선언 방식

```typescript
// ✅ 페이지 컴포넌트, 레이아웃 — function 선언 (Next.js 공식 컨벤션)
export default function DomainSelectPage() { ... }
export default function RootLayout() { ... }

// ✅ 그 외 컴포넌트, 유틸 — 화살표 함수
export const DomainSelectCard = () => { ... }
export const fetchSpotifyArtist = async () => { ... }
```

---

## Import / Export 규칙

### index.ts 재export 필수 (컴포넌트 폴더)

```typescript
// src/components/ui/Button/index.ts
export * from "./Button"
export * from "./Button.types"  // 타입 파일이 있다면
```

### export default 사용 금지 (페이지/레이아웃 제외)

```typescript
// ❌
export default function Button() {}

// ✅
export function Button() {}
export const Button = () => {}

// ✅ 페이지/레이아웃은 예외
export default function SelectPage() {}
```

### 1뎁스 이상 import — @ alias 필수

```typescript
// ❌
import { Button } from "../../components/ui/Button"

// ✅
import { Button } from "@/components/ui/Button"

// ✅ 같은 폴더 내 (1뎁스 이내)는 상대 경로 허용
import { Button } from "./Button"
```

---

## 시맨틱 HTML

```tsx
// 각 페이지의 최상위는 반드시 <main>
export default function SelectPage() {
  return (
    <main>
      <section>
        <h2>도메인을 선택하세요</h2>
        {/* ... */}
      </section>
    </main>
  )
}

// 헤더 메인 로고 — h1 + a
<header>
  <h1>
    <a href="/">StyleSync</a>
  </h1>
</header>
```

- 각 페이지 최상위: `<main>` 필수
- `<section>` 내에는 제목 태그(`h2`~`h6`) 반드시 포함
- 헤더 메인 로고: `<h1><a>` 로 감싸기

---

## Lint 규칙

- `var` 사용 금지 — `const` / `let` 사용
- 세미콜론 허용
- 템플릿 리터럴 허용
- `Double Quote("")` 만 허용
- [Standard JS 규칙](https://standardjs.com/rules.html) 기반, 위 예외 항목 적용

---

## 환경 버전

| 도구 | 버전 |
|------|------|
| Node.js | v22.15.1 |
| pnpm | v10.33.0 |

---

## 스타일시트

- 커스텀 CSS는 `src/styles/globals.css` 에만 작성합니다.
- 페이지/컴포넌트 단위 CSS 파일은 만들지 않고 **Tailwind 클래스**를 사용합니다.
- 반복되는 커스텀 유틸리티는 `globals.css`의 `@layer utilities` 에 추가합니다.
