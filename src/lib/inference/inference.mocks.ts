import type { Domain, InferenceResponse } from "./inference.types";

// ─── Music ────────────────────────────────────────────────────────────────────

export const mockMusicInferenceResponse: InferenceResponse = {
  styleLabel: "인디 멜랑꼴리",
  description:
    "감성적인 기타 리프와 몽환적인 보컬이 교차하는 인디 팝의 서정성. 고요한 도시의 밤과 개인적인 감상이 어우러지는 공간에서 자신만의 미학을 완성합니다.",
  music: [
    {
      id: "spotify:track:mock001",
      name: "Cherry Wine",
      artist: "Hozier",
      image: "https://placehold.co/300x300/1a1c1a/faf9f6",
      previewUrl: "https://p.scdn.co/mp3-preview/mock001",
    },
    {
      id: "spotify:track:mock002",
      name: "Motion Sickness",
      artist: "Phoebe Bridgers",
      image: "https://placehold.co/300x300/1a1c1a/faf9f6",
      previewUrl: null,
    },
    {
      id: "spotify:track:mock003",
      name: "Moon Song",
      artist: "Phoebe Bridgers",
      image: "https://placehold.co/300x300/1a1c1a/faf9f6",
      previewUrl: "https://p.scdn.co/mp3-preview/mock003",
    },
  ],
  movie: [
    {
      id: 1001,
      title: "비포 선라이즈",
      posterPath: "/mock/before-sunrise.jpg",
      genres: ["로맨스", "드라마"],
    },
    {
      id: 1002,
      title: "이터널 선샤인",
      posterPath: "/mock/eternal-sunshine.jpg",
      genres: ["로맨스", "SF", "드라마"],
    },
  ],
  fashion: [
    {
      keyword: "oversized denim jacket",
      image: "https://placehold.co/400x500/f4f3f1/1a1c1a",
    },
    {
      keyword: "striped knit sweater",
      image: "https://placehold.co/400x500/f4f3f1/1a1c1a",
    },
  ],
};

// ─── Movie ────────────────────────────────────────────────────────────────────

export const mockMovieInferenceResponse: InferenceResponse = {
  styleLabel: "시네마틱 미니멀",
  description:
    "미장센을 사랑하는 취향. 과잉 없이 절제된 아름다움에서 감동을 찾으며, 여백과 침묵이 만들어내는 공간에서 스타일을 표현합니다.",
  music: [
    {
      id: "spotify:track:mock011",
      name: "Experience",
      artist: "Ludovico Einaudi",
      image: "https://placehold.co/300x300/2f312f/faf9f6",
      previewUrl: "https://p.scdn.co/mp3-preview/mock011",
    },
    {
      id: "spotify:track:mock012",
      name: "Comptine d'un autre été",
      artist: "Yann Tiersen",
      image: "https://placehold.co/300x300/2f312f/faf9f6",
      previewUrl: null,
    },
  ],
  movie: [
    {
      id: 2001,
      title: "그랜드 부다페스트 호텔",
      posterPath: "/mock/grand-budapest.jpg",
      genres: ["코미디", "드라마", "어드벤처"],
    },
    {
      id: 2002,
      title: "파과",
      posterPath: "/mock/the-past.jpg",
      genres: ["드라마"],
    },
    {
      id: 2003,
      title: "콜",
      posterPath: "/mock/call.jpg",
      genres: ["스릴러", "미스터리"],
    },
  ],
  fashion: [
    {
      keyword: "tailored wool coat",
      image: "https://placehold.co/400x500/2f312f/faf9f6",
    },
    {
      keyword: "turtleneck slim knit",
      image: "https://placehold.co/400x500/2f312f/faf9f6",
    },
  ],
};

// ─── Fashion ──────────────────────────────────────────────────────────────────

export const mockFashionInferenceResponse: InferenceResponse = {
  styleLabel: "스트리트 레이어드",
  description:
    "자유로운 레이어링과 오버핏의 조화. 거리에서 자연스럽게 완성되는 스타일로, 실용성과 개성이 균형을 이룹니다.",
  music: [
    {
      id: "spotify:track:mock021",
      name: "HUMBLE.",
      artist: "Kendrick Lamar",
      image: "https://placehold.co/300x300/ff5c00/ffffff",
      previewUrl: "https://p.scdn.co/mp3-preview/mock021",
    },
    {
      id: "spotify:track:mock022",
      name: "Nights",
      artist: "Frank Ocean",
      image: "https://placehold.co/300x300/ff5c00/ffffff",
      previewUrl: null,
    },
  ],
  movie: [
    {
      id: 3001,
      title: "스파이더맨: 뉴 유니버스",
      posterPath: "/mock/into-the-spider-verse.jpg",
      genres: ["애니메이션", "액션", "어드벤처"],
    },
    {
      id: 3002,
      title: "올드보이",
      posterPath: "/mock/oldboy.jpg",
      genres: ["스릴러", "미스터리", "드라마"],
    },
  ],
  fashion: [
    {
      keyword: "graphic hoodie sweatshirt",
      image: "https://placehold.co/400x500/ff5c00/ffffff",
    },
    {
      keyword: "cargo wide pants",
      image: "https://placehold.co/400x500/ff5c00/ffffff",
    },
    {
      keyword: "chunky sneakers",
      image: "https://placehold.co/400x500/ff5c00/ffffff",
    },
  ],
};

// ─── Helper ───────────────────────────────────────────────────────────────────

const mockByDomain: Record<Domain, InferenceResponse> = {
  music: mockMusicInferenceResponse,
  movie: mockMovieInferenceResponse,
  fashion: mockFashionInferenceResponse,
};

export function getMockByDomain(domain: Domain): InferenceResponse {
  return mockByDomain[domain];
}
