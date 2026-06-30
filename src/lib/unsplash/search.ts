import "server-only";

import { unsplashFetch } from "./client";

import type { FashionImageResult, UnsplashSearchResponse } from "./types";

const toFashionImageResult = (
  photo: UnsplashSearchResponse["results"][number]
): FashionImageResult => ({
  imageUrl: photo.urls.regular,
  thumbnailUrl: photo.urls.small,
  attribution: {
    photographer: photo.user.name,
    profileUrl: photo.user.links.html,
  },
});

export const searchFashionImages = async (
  query: string,
  limit = 10
): Promise<FashionImageResult[]> => {
  const data = await unsplashFetch<UnsplashSearchResponse>("/search/photos", {
    query,
    per_page: String(limit),
    orientation: "portrait",
    content_filter: "high",
  });

  return data.results.map(toFashionImageResult);
};
