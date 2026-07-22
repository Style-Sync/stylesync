"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { AuthSplitLayout } from "@/components/auth/authSplitLayout";
import { useAuthSessionStore } from "@/store/authSessionStore";

import { LoginLandingContent } from "./LoginLandingContent";

const loginFields = [
  {
    id: "email",
    name: "email",
    type: "email" as const,
    label: "이메일",
    placeholder: "name@example.com",
    autoComplete: "email",
  },
  {
    id: "password",
    name: "password",
    type: "password" as const,
    label: "비밀번호",
    placeholder: "비밀번호를 입력해 주세요",
    autoComplete: "current-password",
  },
];

export const AuthLanding = () => {
  const router = useRouter();
  const [isEmailFormOpen, setIsEmailFormOpen] = useState(false);
  const signInWithGoogle = useAuthSessionStore((state) => state.signInWithGoogle);
  const signInWithPassword = useAuthSessionStore((state) => state.signInWithPassword);
  const isSubmitting = useAuthSessionStore((state) => state.isLoading);
  const errorMessage = useAuthSessionStore((state) => state.errorMessage);
  const errorField = useAuthSessionStore((state) => state.errorField);

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };

  const handleEmailLogin = async (formData: FormData) => {
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    const isSuccess = await signInWithPassword(email, password);

    if (isSuccess) {
      router.replace("/");
      router.refresh();
    }
  };

  return (
    <section className="page-container section-wrapper">
      {isEmailFormOpen ? (
        <AuthSplitLayout
          entryTitle="이메일로 로그인"
          entryDescription="StyleSync의 다양한 취향 결과와 기록을 다시 확인해 보세요"
          submitLabel="로그인"
          footerLabel="아직 계정이 없으신가요?"
          footerHref="/signup"
          footerLinkText="회원가입"
          fields={loginFields}
          onSubmit={handleEmailLogin}
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
          fieldErrors={errorField && errorMessage ? { [errorField]: errorMessage } : undefined}
          leadEyebrow="STYLESYNC"
          leadTitle={
            <>
              SYNC YOUR
              <br />
              <span className="text-primary-container">AESTHETIC</span>
            </>
          }
          leadHeadline="당신의 감각과 연결하세요"
          leadDescription={
            <>
              음악, 영화, 패션을 아우르는 개인 맞춤형
              <br />
              스타일 큐레이션 여정으로
            </>
          }
          leadMeta={
            <div className="flex items-center gap-4">
              <span className="rounded-none border border-on-background px-4 py-2 type-title-sm text-on-background">
                SYNCING
              </span>
              <span className="type-title-sm text-on-surface-variant">THE VISIONARY CURATOR</span>
            </div>
          }
          leadVisual={
            <div className="signup-card-shadow flex h-[190px] w-[320px] items-center justify-center gap-10 rounded-[2.75rem] bg-surface">
              <div className="profile-card-shadow flex h-20 w-20 items-center justify-center rounded-full bg-surface">
                <div className="h-10 w-10 rounded-full bg-primary-container" />
              </div>
              <div className="profile-card-shadow flex h-20 w-20 items-center justify-center rounded-full bg-surface">
                <div className="h-10 w-10 rounded-full bg-primary-container" />
              </div>
            </div>
          }
        />
      ) : (
        <LoginLandingContent
          onOpenEmail={() => setIsEmailFormOpen(true)}
          onSignInWithGoogle={handleGoogleLogin}
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
        />
      )}
    </section>
  );
};
