# Inference 스키마 명세

> Feature A — AI 추론 파이프라인 · Issue #52
> 최초 작성: 2026-05-31

---

## 개요

사용자가 선택한 **도메인**(음악·영화·패션)과 **취향 입력**을 받아 Grok AI가 크로스 도메인 스타일 추천을 반환하는 파이프라인의 입출력 계약을 정의합니다.

```
Client
  │
  ├── POST /api/inference
  │     body: InferenceRequest
  │
  └── ← InferenceResponse
```

---

## ERD

```mermaid
erDiagram
    InferenceRequest {
        string  domain       "music | movie | fashion"
        object  selections   "도메인별 분기"
        array   moods        "string[]"
    }

    MusicSelection {
        string  id
        string  name
        string  image
        array   genre        "string[]"
        string  previewUrl   "nullable"
    }

    MovieSelection {
        number  id
        string  title
        string  posterPath
        string  backdropPath
        array   genres       "string[]"
        number  releaseYear
    }

    FashionSelection {
        array   styles       "string[]"
        array   fashionMoods "string[]"
    }

    InferenceResponse {
        string  styleLabel
        string  description
        array   music        "MusicRecommendation[]"
        array   movie        "MovieRecommendation[]"
        array   fashion      "FashionRecommendation[]"
    }

    MusicRecommendation {
        string  id
        string  name
        string  artist
        string  image
        string  previewUrl   "nullable"
    }

    MovieRecommendation {
        number  id
        string  title
        string  posterPath
        array   genres       "string[]"
    }

    FashionRecommendation {
        string  keyword
        string  image
    }

    InferenceRequest ||--o| MusicSelection    : "domain=music"
    InferenceRequest ||--o| MovieSelection    : "domain=movie"
    InferenceRequest ||--o| FashionSelection  : "domain=fashion"
    InferenceResponse ||--|{ MusicRecommendation   : "music[]"
    InferenceResponse ||--|{ MovieRecommendation   : "movie[]"
    InferenceResponse ||--|{ FashionRecommendation : "fashion[]"
```

---

## EDD — Event Data Dictionary

### InferenceRequest

| 필드명 | 타입 | 필수 | 설명 | 예시 |
|---|---|:---:|---|---|
| `domain` | `"music" \| "movie" \| "fashion"` | ✅ | 사용자가 선택한 추론 기준 도메인 | `"music"` |
| `selections` | `MusicSelection \| MovieSelection \| FashionSelection` | ✅ | domain에 대응하는 취향 입력 객체 (discriminated union) | 아래 참조 |
| `moods` | `string[]` | ✅ | 사용자가 선택한 감성 태그 목록 **최소 1개, 최대 5개** | `["몽환적", "차분한"]` |

> `domain`과 `selections`의 타입은 반드시 일치해야 합니다. `domain: "music"`이면 `selections`는 `MusicSelection`이어야 합니다.
> `moods` 배열이 비어 있거나 6개 이상이면 `safeParseRequest()`가 실패합니다.

---

### MusicSelection (domain = "music")

| 필드명 | 타입 | 필수 | 설명 | 예시 |
|---|---|:---:|---|---|
| `id` | `string` | ✅ | Spotify 아티스트/트랙 ID | `"4Z8W4fKeB5YxbusRsdQVPb"` |
| `name` | `string` | ✅ | 아티스트 또는 트랙명 | `"Radiohead"` |
| `image` | `string` | ✅ | 커버 이미지 URL | `"https://i.scdn.co/..."` |
| `genre` | `string[]` | ✅ | 장르 목록 | `["alternative rock", "art rock"]` |
| `previewUrl` | `string \| null` | ✅ | 30초 미리 듣기 URL (없으면 null) | `"https://p.scdn.co/..."` |

---

### MovieSelection (domain = "movie")

| 필드명 | 타입 | 필수 | 설명 | 예시 |
|---|---|:---:|---|---|
| `id` | `number` | ✅ | TMDB 영화/시리즈 ID | `496243` |
| `title` | `string` | ✅ | 제목 | `"기생충"` |
| `posterPath` | `string` | ✅ | TMDB 포스터 경로 (`/` 시작) | `"/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg"` |
| `backdropPath` | `string` | ✅ | TMDB 배경 이미지 경로 | `"/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg"` |
| `genres` | `string[]` | ✅ | 장르명 목록 | `["드라마", "스릴러"]` |
| `releaseYear` | `number` | ✅ | 개봉 연도 | `2019` |

---

### FashionSelection (domain = "fashion")

| 필드명 | 타입 | 필수 | 설명 | 예시 |
|---|---|:---:|---|---|
| `styles` | `string[]` | ✅ | 선택한 스타일 키워드 목록 (각 항목 1자 이상) | `["미니멀", "스트릿"]` |
| `fashionMoods` | `string[]` | ✅ | 패션 도메인 전용 감성 태그 **최소 1개** (각 항목 1자 이상) | `["시크한", "캐주얼한"]` |

> `fashionMoods`는 최상위 `InferenceRequest.moods`(크로스도메인 감성 태그)와 별개입니다. `fashionMoods`는 패션 아이템의 무드 설명, `moods`는 전체 스타일 정체성의 감성 태그입니다.

---

### InferenceResponse

| 필드명 | 타입 | 필수 | 설명 | 예시 |
|---|---|:---:|---|---|
| `styleLabel` | `string` | ✅ | AI가 도출한 크로스 도메인 스타일 레이블 | `"Cinematic Minimalist"` |
| `description` | `string` | ✅ | 스타일 레이블에 대한 설명 문장 | `"조용하지만 강렬한 서사를 담은 ..."` |
| `music` | `MusicRecommendation[]` | ✅ | 음악 추천 카드 목록 | 아래 참조 |
| `movie` | `MovieRecommendation[]` | ✅ | 영화 추천 카드 목록 | 아래 참조 |
| `fashion` | `FashionRecommendation[]` | ✅ | 패션 추천 카드 목록 | 아래 참조 |

---

### MusicRecommendation

| 필드명 | 타입 | 필수 | 설명 | 예시 |
|---|---|:---:|---|---|
| `id` | `string` | ✅ | Spotify 트랙 ID | `"1TfqLAPs4K3s2rJMoCokcS"` |
| `name` | `string` | ✅ | 트랙명 | `"Karma Police"` |
| `artist` | `string` | ✅ | 아티스트명 | `"Radiohead"` |
| `image` | `string` | ✅ | 앨범 커버 이미지 URL | `"https://i.scdn.co/..."` |
| `previewUrl` | `string \| null` | ✅ | 30초 미리 듣기 URL (없으면 null) | `null` |

---

### MovieRecommendation

| 필드명 | 타입 | 필수 | 설명 | 예시 |
|---|---|:---:|---|---|
| `id` | `number` | ✅ | TMDB 영화/시리즈 ID | `68718` |
| `title` | `string` | ✅ | 제목 | `"Django Unchained"` |
| `posterPath` | `string` | ✅ | TMDB 포스터 경로 | `"/7oWY8VDWW7thTzWh3OKYRkWAYXO.jpg"` |
| `genres` | `string[]` | ✅ | 장르명 목록 | `["서부", "드라마"]` |

---

### FashionRecommendation

> Unsplash API 연동 구조: `keyword`로 Unsplash 검색 → `image` URL 수신. `photographerName`/`photographerUrl`은 Unsplash wrapper에서 결과 페이지 렌더링 시 추가.

| 필드명 | 타입 | 필수 | 설명 | 예시 |
|---|---|:---:|---|---|
| `keyword` | `string` | ✅ | Unsplash 검색 키워드 (Grok이 반환) | `"oversized denim jacket"` |
| `image` | `string` | ✅ | Unsplash 이미지 URL (placeholder → 실제 연동 시 대체) | `"https://placehold.co/400x500"` |

---

## 도메인 흐름 요약

```
도메인 선택 (music | movie | fashion)
    ↓
취향 입력 (*Selection)
    ↓
감성 태그 선택 (moods: string[])
    ↓
POST /api/inference { domain, selections, moods }
    ↓
Grok AI 추론
    ↓
{ styleLabel, description, music[], movie[], fashion[] }
```
