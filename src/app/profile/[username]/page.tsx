import { requireAuthenticatedUser } from "@/lib/auth/guards";

interface IProfilePageProps {
  params: { username: string };
}

export default async function ProfilePage({ params }: IProfilePageProps) {
  await requireAuthenticatedUser();

  return <div>프로필 — @{params.username}</div>;
}
