export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
};

export type SpotifyArtist = {
  id: string;
  name: string;
  images: { url: string }[];
  genres: string[];
};

export type TmdbMovie = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  genre_ids: number[];
  release_date: string;
  overview: string;
};

export type NaverShoppingItem = {
  title: string;
  image: string;
  lprice: string;
  link: string;
  mallName: string;
};
