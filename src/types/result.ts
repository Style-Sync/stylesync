export type StyleResult = {
  id: string;
  styleLabel: string;
  description: string;
  recommendations: {
    music: {
      id: string;
      name: string;
      artist: string;
      image: string;
      previewUrl: string | null;
    }[];
    movies: {
      id: number;
      title: string;
      posterPath: string;
      genres: string[];
    }[];
    fashion: {
      id: string;
      name: string;
      image: string;
      price: number;
      link: string;
    }[];
  };
  createdAt: string;
};
