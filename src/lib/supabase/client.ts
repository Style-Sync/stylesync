import { createBrowserClient } from "@supabase/ssr";

export const createSupabaseBrowserClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabasePublishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error("Missing Supabase browser environment variables");
  }

  return createBrowserClient(supabaseUrl, supabasePublishableKey);
};

export const createClient = () => {
  return createSupabaseBrowserClient();
};
