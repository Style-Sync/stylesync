"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useAuthSessionStore } from "@/store/authSessionStore";

export const SettingsContent = () => {
  const router = useRouter();
  const signOut = useAuthSessionStore((state) => state.signOut);
  const isSubmitting = useAuthSessionStore((state) => state.isLoading);
  const errorMessage = useAuthSessionStore((state) => state.errorMessage);

  const handleSignOut = async () => {
    await signOut();
    router.replace("/");
    router.refresh();
  };

  return (
    <div className="page-container section-wrapper">
      <div className="signup-card-shadow mx-auto flex w-full max-w-[32rem] flex-col items-center rounded-[2rem] bg-surface px-8 py-10 text-center">
        <h1 className="heading-section">설정</h1>
        <p className="mt-4 type-title-md text-on-surface-variant">
          현재는 로그아웃 기능을 먼저 제공합니다.
        </p>

        {errorMessage ? (
          <p className="mt-6 type-label-md-regular text-destructive" role="alert">
            {errorMessage}
          </p>
        ) : null}

        <Button
          type="button"
          size="md"
          className="mt-8 w-full max-w-[16rem]"
          onClick={handleSignOut}
          disabled={isSubmitting}
        >
          {isSubmitting ? "처리 중..." : "로그아웃"}
        </Button>
      </div>
    </div>
  );
};
