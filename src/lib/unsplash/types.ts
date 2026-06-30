export type UnsplashPhoto = {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  user: {
    name: string;
    links: { html: string };
  };
  alt_description: string | null;
};

export type UnsplashSearchResponse = {
  total: number;
  total_pages: number;
  results: UnsplashPhoto[];
};

export type FashionImageResult = {
  imageUrl: string;
  thumbnailUrl: string;
  attribution: {
    photographer: string;
    profileUrl: string;
  };
};
