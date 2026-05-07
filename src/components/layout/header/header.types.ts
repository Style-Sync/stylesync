export interface IHeaderProps {
  /**
   * 로그인 상태 여부. 기본값 false (비로그인)
   * TODO: #100 auth session store 구현 후 useUserStore()로 교체
   */
  isLoggedIn?: boolean;
}
