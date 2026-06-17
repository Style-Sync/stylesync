export type TmdbMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  genre_ids: number[];
  release_date: string; // "YYYY-MM-DD"
  overview: string;
};

export type TmdbGenre = {
  id: number;
  name: string;
};

export type TmdbSearchResponse = {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
};

export type TmdbGenreListResponse = {
  genres: TmdbGenre[];
};
