export type Domain = "music" | "movie" | "fashion";

export type MusicSelection = {
  id: string;
  name: string;
  image: string;
  genres: string[];
  previewUrl: string | null;
};

export type MovieSelection = {
  id: number;
  title: string;
  posterPath: string;
  backdropPath: string;
  genres: string[];
  releaseYear: number;
};

export type FashionSelection = {
  styles: string[];
  fashionMoods: string[];
};
