import Link from "next/link";

interface ITastePageProps {
  params: { domain: string };
}

export default function TasteStep1Page({ params }: ITastePageProps) {
  const { domain } = params;

  return (
    <main className="flex flex-col gap-8 p-6">
      <header>
        <h2 className="text-2xl font-bold">{domain} 스타일 셀렉션</h2>
        <p className="text-sm text-neutral-500">당신의 취향에 맞는 스타일을 선택해주세요.</p>
      </header>

      <section>
        {/* TODO: 도메인별 1차 카테고리 리스트 */}
        {/* domain === 'music' → Contemporary Jazz, Pop Iconic, ... */}
        {/* domain === 'movie' → Action, Drama, ... */}
        {/* domain === 'fashion' → Casual, Formal, ... */}
      </section>

      <footer className="flex justify-between">
        <Link href="/select" className="text-sm">
          이전으로
        </Link>

        <Link
          href={`/taste/${domain}/detail`}
          className="rounded-full bg-primary-container px-6 py-3 text-white"
        >
          다음으로
        </Link>
      </footer>
    </main>
  );
}
