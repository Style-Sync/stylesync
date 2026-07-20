import "server-only";

const requireServerEnv = (key: keyof AppServerEnv, value: string | undefined) => {
  if (!value) {
    throw new Error(`Missing server environment variable: ${key}`);
  }

  return value;
};

export type AppServerEnv = {
  GROK_API_KEY: string;
  SPOTIFY_CLIENT_ID: string;
  SPOTIFY_CLIENT_SECRET: string;
  TMDB_API_KEY: string;
  UNSPLASH_ACCESS_KEY: string;
};

const getRequiredServerEnv = (key: keyof AppServerEnv) => {
  return requireServerEnv(key, process.env[key]);
};

const getSpotifyClientId = () => getRequiredServerEnv("SPOTIFY_CLIENT_ID");

const getSpotifyClientSecret = () => getRequiredServerEnv("SPOTIFY_CLIENT_SECRET");

export const getGrokApiKey = () => getRequiredServerEnv("GROK_API_KEY");

export const getSpotifyCredentials = () => ({
  clientId: getSpotifyClientId(),
  clientSecret: getSpotifyClientSecret(),
});

export const getTmdbApiKey = () => getRequiredServerEnv("TMDB_API_KEY");

export const getUnsplashAccessKey = () => getRequiredServerEnv("UNSPLASH_ACCESS_KEY");

// 개별 getter로 필요한 키만 검증하되, 기존 getServerEnv 호출부와도 호환됩니다.
export const getServerEnv = (): AppServerEnv => ({
  get GROK_API_KEY() {
    return getGrokApiKey();
  },
  get SPOTIFY_CLIENT_ID() {
    return getSpotifyClientId();
  },
  get SPOTIFY_CLIENT_SECRET() {
    return getSpotifyClientSecret();
  },
  get TMDB_API_KEY() {
    return getTmdbApiKey();
  },
  get UNSPLASH_ACCESS_KEY() {
    return getUnsplashAccessKey();
  },
});
