"use client";

import { useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { AuthSplitLayout } from "@/components/auth/authSplitLayout";
import { useAuthSessionStore } from "@/store/authSessionStore";

const signupFields = [
  {
    id: "email",
    name: "email",
    type: "email" as const,
    label: "이메일 주소 (EMAIL ADDRESS)",
    placeholder: "curator@stylesync.com",
    autoComplete: "email",
  },
  {
    id: "nickname",
    name: "nickname",
    type: "text" as const,
    label: "닉네임 (NICKNAME)",
    placeholder: "@username",
    autoComplete: "nickname",
  },
  {
    id: "password",
    name: "password",
    type: "password" as const,
    label: "비밀번호 (PASSWORD)",
    placeholder: "••••••••",
    autoComplete: "new-password",
  },
  {
    id: "confirmPassword",
    name: "confirmPassword",
    type: "password" as const,
    label: "비밀번호 확인 (CONFIRM PASSWORD)",
    placeholder: "••••••••",
    autoComplete: "new-password",
  },
];

export const AuthSignupPage = () => {
  const router = useRouter();
  const signUpWithPassword = useAuthSessionStore((state) => state.signUpWithPassword);
  const isSubmitting = useAuthSessionStore((state) => state.isLoading);
  const errorMessage = useAuthSessionStore((state) => state.errorMessage);
  const errorField = useAuthSessionStore((state) => state.errorField);
  const statusMessage = useAuthSessionStore((state) => state.statusMessage);
  const setError = useAuthSessionStore((state) => state.setError);
  const [localFieldErrors, setLocalFieldErrors] = useState<Partial<Record<string, string>>>({});

  const fieldErrors = useMemo(() => {
    const nextFieldErrors = { ...localFieldErrors };

    if (errorField && errorMessage) {
      nextFieldErrors[errorField] = errorMessage;
    }

    return Object.keys(nextFieldErrors).length > 0 ? nextFieldErrors : undefined;
  }, [errorField, errorMessage, localFieldErrors]);

  const handleSignup = async (formData: FormData) => {
    setLocalFieldErrors({});

    const email = String(formData.get("email") ?? "").trim();
    const nickname = String(formData.get("nickname") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      setError({ message: null });
      setLocalFieldErrors({
        confirmPassword: "비밀번호가 일치하지 않아요.",
      });
      return;
    }

    const isSuccess = await signUpWithPassword({
      email,
      password,
      nickname,
    });

    if (isSuccess) {
      router.refresh();
    }
  };

  return (
    <main className="page-container section-wrapper">
      <AuthSplitLayout
        entryTitle="회원가입"
        entryDescription="당신의 비전을 위한 공간입니다."
        submitLabel="가입하기"
        footerLabel="이미 계정이 있으신가요?"
        footerHref="/login"
        footerLinkText="로그인"
        fields={signupFields}
        onSubmit={handleSignup}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
        statusMessage={statusMessage}
        fieldErrors={fieldErrors}
        leadEyebrow="STYLESYNC"
        leadTitle={
          <>
            SYNC YOUR
            <br />
            <span className="text-primary-container">AESTHETIC</span>
          </>
        }
        leadHeadline="당신의 감각을 연결하세요"
        leadDescription={
          <>
            음악, 영화, 패션을 아우르는 개인 맞춤형
            <br />
            스타일 큐레이션 솔루션
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
    </main>
  );
};
