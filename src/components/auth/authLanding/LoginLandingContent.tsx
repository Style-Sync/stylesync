"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/Icon/Icon";

const LoginCard = ({
  className,
  title,
  backgroundClassName,
  accentClassName,
  titleClassName,
}: {
  className: string;
  title: string;
  backgroundClassName: string;
  accentClassName?: string;
  titleClassName?: string;
}) => {
  return (
    <div className={className}>
      <div
        className={`relative flex h-full w-full flex-col items-center justify-between overflow-hidden rounded-[3rem] p-8 ${backgroundClassName}`}
      >
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-[0_10px_30px_rgba(26,28,26,0.08)]">
          <div className="relative h-16 w-16 rounded-full bg-white">
            <span
              className={`absolute left-[12px] top-[26px] h-3 w-3 rounded-full bg-[#2e2e2e] ${accentClassName ?? ""}`}
            />
            <span
              className={`absolute right-[12px] top-[26px] h-3 w-3 rounded-full bg-[#2e2e2e] ${accentClassName ?? ""}`}
            />
            <span className="absolute left-1/2 top-[44px] h-px w-7 -translate-x-1/2 rotate-[-8deg] bg-[#d4d4d4]" />
          </div>
        </div>
        <p
          className={`whitespace-pre-line text-center font-headline text-[1.15rem] font-black leading-[1.05] tracking-[-0.05em] ${titleClassName ?? "text-white"}`}
        >
          {title}
        </p>
      </div>
    </div>
  );
};

type LoginLandingContentProps = {
  onOpenEmail: () => void;
  onSignInWithGoogle: () => void | Promise<void>;
  isSubmitting?: boolean;
  errorMessage?: string | null;
};

export const LoginLandingContent = ({
  onOpenEmail,
  onSignInWithGoogle,
  isSubmitting = false,
  errorMessage,
}: LoginLandingContentProps) => {
  return (
    <section className="header-gap relative min-h-[640px] lg:mt-0 lg:min-h-[780px]">
      <h2 className="sr-only">로그인</h2>

      <LoginCard
        className="absolute left-[4%] top-[2%] hidden h-[323px] w-[243px] -rotate-[15deg] lg:block"
        title={"Neo-Tokyo\nHacker"}
        backgroundClassName="bg-[linear-gradient(180deg,#1d1f1d_0%,#202221_38%,#d9d6d1_100%)]"
      />
      <LoginCard
        className="absolute left-[8%] top-[56%] hidden h-[282px] w-[206px] -rotate-[12deg] lg:block"
        title={"Forest Folk\nDreamer"}
        backgroundClassName="bg-[linear-gradient(180deg,#d9eef0_0%,#d9eef0_100%)]"
        accentClassName="bg-[#41c86b]"
        titleClassName="text-on-background"
      />
      <LoginCard
        className="absolute right-[2%] top-[6%] hidden h-[352px] w-[256px] rotate-[18deg] lg:block"
        title={"Retro Future\nPilot"}
        backgroundClassName="bg-[linear-gradient(180deg,#ff6408_0%,#ff6508_46%,#f0dfd0_100%)]"
      />
      <LoginCard
        className="absolute right-[2%] top-[52%] hidden h-[352px] w-[287px] -rotate-[12deg] lg:block"
        title={"MIDNIGHT JAZZ\nPOET"}
        backgroundClassName="bg-[#0b355d]"
        titleClassName="text-[#c8d8ff]"
      />

      <div className="mx-auto flex w-full max-w-[560px] flex-col items-center text-center lg:max-w-[460px]">
        <h3 className="heading-display">StyleSync</h3>
        <div className="mt-6 h-1.5 w-12 rounded-full bg-primary-container lg:mt-7" />
        <p className="mt-8 heading-section keep-all">나만의 스타일을 찾아보세요</p>
        <p className="mt-4 type-title-md text-on-surface-variant">
          당신의 감각을 완성하는 큐레이션의 시작
        </p>

        <section className="signup-card-shadow mt-10 w-full rounded-[2.5rem] bg-surface px-6 py-10 md:px-10 lg:mt-12">
          <h4 className="sr-only">로그인 시작 옵션</h4>
          <Button
            fullWidth
            size="md"
            type="button"
            disabled={isSubmitting}
            onClick={onSignInWithGoogle}
            className="h-[58px] text-title-md md:h-[60px]"
            icon={<Icon name="google" size={24} className="text-primary-foreground" />}
            iconPosition="left"
          >
            {isSubmitting ? "처리 중..." : "Google로 시작하기"}
          </Button>

          {errorMessage ? (
            <p className="mt-6 type-label-md-regular text-destructive" role="alert">
              {errorMessage}
            </p>
          ) : null}

          <p className="mt-10 type-label-md-regular text-on-surface-variant">또는</p>
          <Button
            type="button"
            onClick={onOpenEmail}
            variant="ghost"
            size="md"
            className="mt-10 h-auto p-0 text-title-md text-on-background hover:opacity-70"
          >
            이메일로 시작하기
          </Button>
        </section>

        <div className="mt-10 flex items-center justify-center gap-2">
          <span className="type-title-sm text-on-surface-variant">계정이 없으신가요?</span>
          <Link href="/signup" className="type-title-sm text-primary-container">
            회원가입
          </Link>
        </div>

        <Link
          href="#"
          className="mt-5 inline-flex items-center gap-2 type-label-md-regular text-on-background"
        >
          비회원으로 계속하기
          <Icon name="arrowRight" size={18} className="text-on-background" />
        </Link>
      </div>
    </section>
  );
};
