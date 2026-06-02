import Link from "next/link";

interface ITasteDetailPageProps {
  params: { domain: string };
}

export default function TasteStep2Page({ params }: ITasteDetailPageProps) {
  const { domain } = params;

  return (
    <main className="flex flex-col gap-8 p-6">
      <header>
        <h2 className="text-2xl font-bold">{domain} 취향 선택</h2>
        <p className="text-sm text-neutral-500">가장 선호하는 아이템을 선택해주세요.</p>
      </header>

      <section>
        {/* TODO: 도메인별 2차 카테고리 카드 그리드 */}
        {/* music → 아티스트 카드 */}
        {/* movie → 영화/배우 카드 */}
        {/* fashion → 아이템/브랜드 카드 */}
      </section>

      <footer className="flex justify-between">
        <Link href={`/taste/${domain}`} className="text-sm">
          이전으로
        </Link>

        <Link href="/result" className="rounded-full bg-primary-container px-6 py-3 text-white">
          스타일 분석 시작하기
        </Link>
      </footer>
    </main>
  );
}
