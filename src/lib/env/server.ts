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

export const getServerEnv = (): AppServerEnv => ({
  GROK_API_KEY: requireServerEnv("GROK_API_KEY", process.env.GROK_API_KEY),
  SPOTIFY_CLIENT_ID: requireServerEnv("SPOTIFY_CLIENT_ID", process.env.SPOTIFY_CLIENT_ID),
  SPOTIFY_CLIENT_SECRET: requireServerEnv(
    "SPOTIFY_CLIENT_SECRET",
    process.env.SPOTIFY_CLIENT_SECRET
  ),
  TMDB_API_KEY: requireServerEnv("TMDB_API_KEY", process.env.TMDB_API_KEY),
  UNSPLASH_ACCESS_KEY: requireServerEnv("UNSPLASH_ACCESS_KEY", process.env.UNSPLASH_ACCESS_KEY),
});
