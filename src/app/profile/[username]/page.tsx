interface IProfilePageProps {
  params: { username: string };
}

export default function ProfilePage({ params }: IProfilePageProps) {
  return <div>프로필 — @{params.username}</div>;
}
