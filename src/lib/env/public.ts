const requirePublicEnv = (key: keyof AppPublicEnv, value: string | undefined) => {
  if (!value) {
    throw new Error(`Missing public environment variable: ${key}`);
  }

  return value;
};

export type AppPublicEnv = {
  NEXT_PUBLIC_SITE_URL: string;
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: string;
  NEXT_PUBLIC_SUPABASE_URL: string;
};

export const getPublicEnv = (): AppPublicEnv => ({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: requirePublicEnv(
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ),
  NEXT_PUBLIC_SUPABASE_URL: requirePublicEnv(
    "NEXT_PUBLIC_SUPABASE_URL",
    process.env.NEXT_PUBLIC_SUPABASE_URL
  ),
});
