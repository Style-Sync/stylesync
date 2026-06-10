export interface IHeaderProps {
  /**
   * 스토리북/프리뷰에서 로그인 상태를 강제로 지정할 때 사용합니다.
   * 값이 없으면 auth session store 상태를 사용합니다.
   */
  isLoggedIn?: boolean;
}
