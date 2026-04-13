interface Props {
  params: { username: string };
}

export default function ProfilePage({ params }: Props) {
  return <div>프로필 — @{params.username}</div>;
}
