# StyleSync 브라우저 호환성

> 이슈 #93. 코드베이스에서 실제로 사용 중인 웹 플랫폼 기능을 전수 조사하고,
> 지원 기준 브라우저와 각 기능의 실동작/열화 방식을 정리합니다.
> QA 시 [docs/release-checklist.md](./release-checklist.md) 5장(모바일 레이아웃)과 함께 확인합니다.

조사 기준: `dev` @ `f889873` / Next.js 14.2.30 / React 18 / Tailwind CSS 3.4

---

## 1. 지원 기준 브라우저

`package.json`에 `browserslist` 키가 없으므로 **Next.js 기본 타깃**이 적용됩니다.
SWC가 이 타깃에 맞춰 JS를 트랜스파일하므로, 문법(옵셔널 체이닝·nullish 병합 등)은 별도 대응이 필요 없습니다.

| 브라우저 | 최소 버전 | 비고 |
|----------|----------|------|
| Chrome | 64+ | Next.js 기본 타깃 |
| Edge | 79+ | Chromium 기반 |
| Firefox | 67+ | |
| Safari (macOS) | 12+ | |
| iOS Safari | 12+ | |

단, 아래 3장에서 정리한 **런타임 API / CSS 기능**은 트랜스파일 대상이 아니므로
실제 동작 하한선은 표보다 높습니다. 실질 하한은 **Safari 16 / iOS 16** 입니다
(컨테이너 쿼리 요구 사항 — 3.4 참고).

---

## 2. 조사 대상 (코드베이스 전수 스캔)

`src/` 하위에서 사용 중인 브라우저 의존 기능은 다음이 전부입니다.

| 기능 | 위치 | 분류 |
|------|------|------|
| Web Share API (`navigator.share`) | `src/app/result/[id]/page.tsx` | 런타임 API |
| Clipboard API (`navigator.clipboard`) | `src/app/result/[id]/page.tsx` | 런타임 API |
| `HTMLAudioElement` (`new Audio`) | `src/hooks/useAudioPlayer.ts` | 런타임 API |
| `sessionStorage` | `src/store/tasteStore.ts`, `src/store/resultStore.ts` | 런타임 API |
| `Element.scrollIntoView({behavior})` | `src/app/result/[id]/page.tsx` | 런타임 API |
| `structuredClone` | `src/lib/inference/inference.mocks.ts` | 서버 전용 |
| `crypto.randomUUID` | `src/app/api/inference/route.ts` | 서버 전용 |
| 컨테이너 쿼리 (`@container`) | `src/components/layout/{header,footer}` | CSS |
| `backdrop-filter` | `Header.tsx`, `RecommendCard.tsx` | CSS |
| `text-wrap: balance` | `src/styles/globals.css` | CSS |
| `font-variation-settings` | `src/styles/globals.css` | CSS |
| 가변 폰트 (`next/font/google`) | `src/app/layout.tsx` | 폰트 |

> `<dialog>`, `:has()`, `IntersectionObserver`, `ResizeObserver`, `matchMedia`,
> `AbortSignal.timeout`, `Object.groupBy`는 **사용처 없음**.

---

## 3. 기능별 지원 현황

### 3.1 Web Share API — ✅ 폴백 있음

```tsx
// src/app/result/[id]/page.tsx
if (navigator.share) {
  try {
    await navigator.share(shareData);
    return;
  } catch {
    // 사용자 취소 시 무시
  }
}
await navigator.clipboard.writeText(window.location.href);
```

| 브라우저 | `navigator.share` | 실제 동작 |
|----------|------------------|----------|
| iOS Safari 12.2+ | ✅ | OS 공유 시트 |
| Android Chrome 61+ | ✅ | OS 공유 시트 |
| macOS Safari 12.1+ | ✅ | 공유 시트 |
| Desktop Chrome (Windows / ChromeOS) | ✅ | OS 공유 |
| Desktop Chrome (Linux) | ❌ | 클립보드 폴백 |
| Firefox (전 플랫폼) | ❌ | 클립보드 폴백 |

> Desktop Chrome은 플랫폼별로 지원 시점이 다릅니다. 어느 쪽이든 존재 검사로 분기되므로
> 동작상 문제는 없고, QA 시 "공유 시트 / 클립보드 폴백" 중 무엇이 떠도 정상입니다.

`if (navigator.share)` 존재 검사가 있어 미지원 브라우저는 클립보드 복사로 자연스럽게 열화됩니다.
`share()`는 **HTTPS(보안 컨텍스트) + 사용자 제스처**를 요구하며, 두 조건 모두 충족합니다
(버튼 `onClick` 핸들러 / Vercel HTTPS).

### 3.2 Clipboard API — ⚠️ 가드 없음 (알려진 이슈)

폴백 경로인 `navigator.clipboard.writeText()`에 **존재 검사가 없습니다.**
`navigator.clipboard`는 **보안 컨텍스트에서만** 정의되므로, 아래 상황에서
`TypeError: Cannot read properties of undefined (reading 'writeText')`가 발생하고
`handleShareCard`가 unhandled rejection으로 끝납니다. 사용자에게는 아무 반응도 보이지 않습니다.

- `http://<LAN IP>:3000` 으로 모바일 실기기 테스트할 때 (팀 내 QA에서 흔함)
- HTTPS가 아닌 임의 프리뷰 환경

`https://` 와 `http://localhost` 는 보안 컨텍스트로 취급되므로 로컬 개발과 Vercel 배포에서는 재현되지 않습니다.

→ **이슈 #295**로 분리. `src/app/result/[id]/page.tsx`는 현재 PR #270에서 수정 중이라
이 문서에서는 기록만 합니다.

### 3.3 HTMLAudioElement — ⚠️ 재개 경로 예외 처리 누락 (알려진 이슈)

```ts
// src/hooks/useAudioPlayer.ts
audioRef.current?.play();          // ← 재개 경로: Promise 미처리
// ...
audio.play().catch(() => { ... }); // ← 신규 재생 경로: 처리됨
```

`play()`는 Promise를 반환하고 iOS Safari에서 `NotAllowedError`로 거절될 수 있습니다.
재개(일시정지 후 다시 재생) 경로에는 `.catch()`가 없어, 거절 시
unhandled rejection이 발생하면서 `isPlaying`이 `true`로 남아 UI가 실제 재생 상태와 어긋납니다.

Spotify 미리듣기(`previewUrl`)는 30초 MP3이며, MP3 디코딩은 전 대상 브라우저에서 지원됩니다.
iOS 무음 스위치가 켜져 있으면 소리가 나지 않지만 이는 OS 정책으로 앱에서 우회할 수 없습니다.

→ **이슈 #296**으로 분리.

### 3.4 컨테이너 쿼리 (`@container`) — ✅ 실질 하한선 결정

`@tailwindcss/container-queries` 플러그인이 `tailwind.config.ts`에 등록되어 있고,
`Header` / `Footer`의 반응형이 미디어 쿼리가 아닌 **컨테이너 쿼리**로 구현되어 있습니다.

| 브라우저 | 지원 |
|----------|------|
| Chrome / Edge 105+ | ✅ |
| Safari 16+ / iOS 16+ | ✅ |
| Firefox 110+ | ✅ |

미지원 브라우저에서는 `@md:` / `@lg:` 변형이 **전혀 적용되지 않아** 헤더·푸터가
모바일 레이아웃으로 고정됩니다(레이아웃 붕괴는 아니지만 데스크톱에서 어색함).
이 프로젝트의 **실질 지원 하한선을 Safari 16 / iOS 16으로 만드는 요인**입니다.

### 3.5 `backdrop-filter` — ✅ 프리픽스 확인 완료

Safari는 **18.0 이전까지 `-webkit-backdrop-filter` 프리픽스**를 요구합니다.
이 프로젝트의 `postcss.config.mjs`는 `tailwindcss` 플러그인만 등록하고 있어
**Next.js 기본 PostCSS 체인(autoprefixer 포함)을 덮어씁니다.** 즉 autoprefixer가 동작하지 않습니다.

그럼에도 두 사용처 모두 프리픽스가 들어갑니다. 이유가 다르므로 각각 기록합니다.

| 위치 | 방식 | 프리픽스 |
|------|------|---------|
| `RecommendCard.tsx` | Tailwind `backdrop-blur-[2px]` | ✅ Tailwind가 `-webkit-backdrop-filter`를 **직접** 출력 (autoprefixer 무관) |
| `Header.tsx` | React 인라인 스타일 | ✅ `WebkitBackdropFilter`를 **수동으로 병기**해 둠 |

React는 인라인 스타일에 벤더 프리픽스를 자동으로 붙이지 않으므로, 앞으로
인라인 스타일로 프리픽스가 필요한 속성을 쓸 때는 `Header.tsx`처럼 `Webkit*` 키를 직접 적어야 합니다.

> ⚠️ **주의**: autoprefixer가 비활성 상태라는 사실 자체는 유효합니다.
> 향후 프리픽스가 필요한 CSS(예: `mask`, 일부 `user-select`)를 추가하면 자동 대응되지 않습니다.
> 필요해지는 시점에 `postcss.config.mjs`에 `autoprefixer`를 명시적으로 추가해야 합니다.

### 3.6 `text-wrap: balance` — ✅ 안전한 열화

`globals.css`의 `.text-balance` 유틸리티. Chrome 114+ / Safari 17.5+ / Firefox 121+.
미지원 브라우저는 선언을 무시하고 일반 줄바꿈으로 렌더링합니다. 레이아웃 영향 없음.

`result/[id]/page.tsx`의 비로그인 배너 스크롤에 쓰이는 `scrollIntoView({ behavior: "smooth" })`도
같은 성격입니다. Safari 15.4 미만은 `behavior` 옵션을 무시하고 즉시 스크롤합니다. 기능 손실 없음.

### 3.7 `sessionStorage` + zustand persist — ✅ (동작 특성 주의)

`tasteStore` / `resultStore`가 `createJSONStorage(() => sessionStorage)`로 영속화됩니다.
전 대상 브라우저에서 지원되며, 최신 Safari 프라이빗 브라우징에서도 동작합니다.

다만 브라우저 지원과 별개로 **React 18 hydration 타이밍** 특성이 있습니다.
zustand v5의 `useStore`는 `useSyncExternalStore`의 `getServerSnapshot`으로
`api.getInitialState()`를 넘기는데, `persist` 미들웨어가 이를 **복원 전 초기 상태**로 고정합니다.
따라서 **하드 로드(새로고침 / URL 직접 진입) 시 첫 커밋과 첫 `useEffect`는 복원 전 값**을 봅니다.

→ store 값을 근거로 리다이렉트하는 가드를 작성할 때는 반드시
`useTasteStore.persist.hasHydrated()` / `onFinishHydration()`으로 복원 완료를 확인한 뒤 판단해야 합니다.
(PR #251 리뷰에서 동일 패턴이 지적됨)

### 3.8 폰트 (`next/font/google`) — ✅

`Epilogue`, `Plus Jakarta Sans`, `Noto Sans KR`, `JetBrains Mono`를 `next/font/google`로 로드합니다.
빌드 타임에 셀프 호스팅되어 런타임 외부 요청이 없고, `woff2`는 전 대상 브라우저가 지원합니다.
`font-variation-settings`(가변 폰트)는 Safari 11+ / Chrome 62+ 지원.

> 참고: `globals.css`의 `.material-symbols-outlined` 규칙은 **사용처가 없습니다.**
> 아이콘은 `src/components/ui/Icon`에서 인라인 SVG 컴포넌트로 렌더링하며 아이콘 폰트를 쓰지 않습니다.
> 호환성 이슈는 아니지만 데드 CSS입니다.

### 3.9 서버 전용 API — ✅

| API | 위치 | 런타임 |
|-----|------|--------|
| `crypto.randomUUID()` | `src/app/api/inference/route.ts` | Node 19+ 전역 제공. Vercel Node 20/22 런타임에서 안전 |
| `structuredClone()` | `src/lib/inference/inference.mocks.ts` | Node 17+ 전역 제공 |

두 API 모두 클라이언트 번들에 포함되지 않으므로 브라우저 호환성과 무관합니다.
단, 해당 라우트를 **Edge 런타임으로 전환할 경우** 재검증이 필요합니다.

---

## 4. QA 체크리스트

릴리즈 전 아래 조합에서 확인합니다. 최소 조합은 **A·B·C 3종**입니다.

| # | 환경 | 확인 항목 |
|---|------|----------|
| A | iOS Safari (최신) | 전체 플로우, 공유 버튼 → OS 공유 시트, 미리듣기 재생/일시정지 |
| B | Android Chrome (최신) | 전체 플로우, 공유 버튼 → OS 공유 시트, 미리듣기 재생 |
| C | Desktop Chrome (최신) | 전체 플로우, 공유 버튼 → 클립보드 폴백 + "복사됨" 토스트 |
| D | Desktop Safari (최신) | 헤더 blur 렌더, 컨테이너 쿼리 기반 헤더/푸터 반응형 |
| E | Desktop Firefox (최신) | 공유 버튼 → 클립보드 폴백, `text-wrap: balance` 미적용 시 레이아웃 확인 |
| F | iOS Safari 16 | 컨테이너 쿼리 하한선 검증 — 헤더/푸터 반응형 동작 |

- [ ] A. iOS Safari 통과
- [ ] B. Android Chrome 통과
- [ ] C. Desktop Chrome 통과
- [ ] D. Desktop Safari 통과
- [ ] E. Desktop Firefox 통과
- [ ] F. iOS Safari 16 통과

> ⚠️ 실기기 테스트를 `http://<LAN IP>:3000`으로 진행하면 3.2의 Clipboard 이슈로
> 공유 폴백이 실패합니다. HTTPS 터널(`vercel dev` 프리뷰 URL 등)을 사용하세요.

---

## 5. 후속 조치

| 항목 | 근거 | 상태 |
|------|------|------|
| `navigator.clipboard` 존재 검사 + 실패 시 사용자 피드백 | 3.2 | **#295** (`result/[id]/page.tsx` — PR #270 작업 중) |
| `audio.play()` 재개 경로 `.catch()` 추가 | 3.3 | **#296** |
| `postcss.config.mjs`에 `autoprefixer` 명시 | 3.5 | 현재 영향 없음 — 필요 시점에 대응 |
| `.material-symbols-outlined` 데드 CSS 제거 | 3.8 | 미등록 (호환성 무관) |
