import { redirect } from "next/navigation";

/**
 * 내 프로필 리다이렉트 — /profile
 * TODO: #100 auth 연결 후 redirect(`/profile/${user.username}`) 으로 교체
 */
export default function ProfilePage() {
  // TODO: auth store에서 username을 가져와서 아래처럼 변경
  // const { user } = useUserStore();
  // redirect(`/profile/${user.username}`);
  redirect("/");
}
