import { AuthSignupPage } from "@/components/auth/authSignup/AuthSignupPage";
import { redirectIfAuthenticated } from "@/lib/auth/guards";

export default async function SignupPage() {
  await redirectIfAuthenticated();

  return <AuthSignupPage />;
}
