import { redirect } from "next/navigation";

import { getDefaultProfileRedirectPath, requireAuthenticatedUser } from "@/lib/auth/guards";

export default async function ProfilePage() {
  const user = await requireAuthenticatedUser();

  redirect(getDefaultProfileRedirectPath(user));
}
