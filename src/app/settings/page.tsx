import { SettingsContent } from "@/components/settings/SettingsContent";
import { requireAuthenticatedUser } from "@/lib/auth/guards";

export default async function SettingsPage() {
  await requireAuthenticatedUser();

  return <SettingsContent />;
}
