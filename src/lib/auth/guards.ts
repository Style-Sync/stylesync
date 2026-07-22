import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";

import type { User } from "@supabase/supabase-js";

const getDefaultProfilePath = (user: User) => {
  const nickname = user.user_metadata?.nickname;

  if (typeof nickname === "string" && nickname.trim().length > 0) {
    return `/profile/${encodeURIComponent(nickname.trim())}`;
  }

  if (user.email) {
    return `/profile/${encodeURIComponent(user.email.split("@")[0])}`;
  }

  return `/profile/${encodeURIComponent(user.id)}`;
};

export const getAuthenticatedUser = async () => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};

export const requireAuthenticatedUser = async () => {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect("/login");
  }

  return user;
};

export const redirectIfAuthenticated = async (redirectPath?: string) => {
  const user = await getAuthenticatedUser();

  if (!user) {
    return null;
  }

  redirect(redirectPath ?? getDefaultProfilePath(user));
};

export const getDefaultProfileRedirectPath = getDefaultProfilePath;
