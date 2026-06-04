import { createBrowserClient } from "@supabase/ssr";

export const createSupabaseBrowserClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
};

export const createClient = () => {
  return createSupabaseBrowserClient();
};
