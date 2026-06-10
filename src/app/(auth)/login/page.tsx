import { AuthLanding } from "@/components/auth/authLanding/AuthLanding";
import { redirectIfAuthenticated } from "@/lib/auth/guards";

export default async function LoginPage() {
  await redirectIfAuthenticated();

  return <AuthLanding />;
}
