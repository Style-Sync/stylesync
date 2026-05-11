export interface IShareCardMusic {
  /** 트랙 제목 (Spotify API) */
  title: string;
  /** 아티스트 이름 (Spotify API) */
  artist: string;
  /** 앨범 아트 URL (Spotify API) */
  imageUrl?: string;
}

export interface IShareCardMovie {
  /** 영화/시리즈 제목 (TMDB API) */
  title: string;
  /** 포스터 이미지 URL (TMDB API) */
  imageUrl?: string;
}

export interface IShareCardFashion {
  /** 패션 이미지 URL (Unsplash API) */
  imageUrl?: string;
  /** 스타일 키워드 (Unsplash 태그 or Grok 추론) */
  keyword?: string;
}

export interface IShareCardProps {
  /** AI 생성 스타일 레이블 (예: "STYLE IDENTITY") */
  styleLabel?: string;
  /** AI 생성 스타일 타이틀 (Grok API, 예: "Cyberpunk\nArchivist") */
  styleTitle: string;
  /** 유저가 입력으로 선택한 도메인 */
  inputDomain: "music" | "movie" | "fashion";
  /** 음악 추천 데이터 (Spotify API) */
  music?: IShareCardMusic;
  /** 영화 추천 데이터 (TMDB API) */
  movie?: IShareCardMovie;
  /** 패션 추천 데이터 (Unsplash API) */
  fashion?: IShareCardFashion;
  /** 유저명 */
  username?: string;
  /** 유저 아바타 URL */
  avatarUrl?: string;
}
