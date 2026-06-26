import "server-only";

type ItunesSearchResponse = {
  results: { previewUrl?: string }[];
};

export const getArtistPreviewUrl = async (
  artistName: string,
  country = "KR"
): Promise<string | null> => {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(artistName)}&entity=song&limit=5&country=${country}`;

  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data: ItunesSearchResponse = await res.json();
    return data.results.find((r) => r.previewUrl)?.previewUrl ?? null;
  } catch {
    return null;
  }
};
