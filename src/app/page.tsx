import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <section>
        <h1 className="font-headline font-black tracking-tighter text-4xl text-on-background">
          StyleSync
        </h1>
        <p className="mt-2 text-on-surface-variant keep-all">
          음악 × 영화 × 패션, 하나의 취향에서 시작해 세 개의 세계로 연결됩니다
        </p>
        {/* 임시 — 라우팅 테스트용 */}
        <Link
          href="/select"
          className="mt-8 inline-block rounded-full bg-primary-container px-8 py-3 text-white"
        >
          시작하기
        </Link>
      </section>
    </main>
  );
}
