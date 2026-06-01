import { RecommendCard } from "@/components/result/recommendCard";
import { ShareCard } from "@/components/result/shareCard";
import { Button } from "@/components/ui/button";
import type { StyleResult } from "@/types/result";

// ── Mock data (shell 단계 — 실제 API 연동 시 제거) ───────────────────────────
const MOCK_RESULT: StyleResult = {
  id: "mock-1",
  styleLabel: {
    title: "Melancholic Softboy",
    description:
      "향수 어린 빈티지 미학과 현대적인 감수성이 정교하게 어우러진 스타일입니다. 차분한 어스 톤과 오버사이즈 실루엣이 당신의 정체성을 정의합니다.",
    themeColor: "#e6e6fa",
    mood: { energy: "low", tone: "dark", aesthetic: "indie" },
  },
  recommendations: {
    music: [
      { id: "1", name: "Blonde", artist: "Frank Ocean", image: "", previewUrl: null },
      { id: "2", name: "Ivy", artist: "Frank Ocean", image: "", previewUrl: null },
      { id: "3", name: "Nights", artist: "Frank Ocean", image: "", previewUrl: null },
    ],
    movies: [
      { id: 1, title: "Call Me By Your Name", posterPath: "", genres: ["Drama", "Romance"] },
      { id: 2, title: "Moonlight", posterPath: "", genres: ["Drama"] },
      { id: 3, title: "Lost in Translation", posterPath: "", genres: ["Drama"] },
    ],
    fashion: [
      {
        id: "1",
        keyword: "Oversized Earth Tone Coat",
        image: "",
        photographerName: "John Doe",
        photographerUrl: "",
      },
      {
        id: "2",
        keyword: "Minimal Monochrome Set",
        image: "",
        photographerName: "Jane Doe",
        photographerUrl: "",
      },
      {
        id: "3",
        keyword: "Soft Denim Layer",
        image: "",
        photographerName: "Alex Kim",
        photographerUrl: "",
      },
    ],
  },
  createdAt: new Date().toISOString(),
};

// ─────────────────────────────────────────────────────────────────────────────

interface IResultPageProps {
  params: { id: string };
}

export default function ResultPage({ params: _params }: IResultPageProps) {
  // TODO: _params.id로 API에서 실제 데이터 fetch
  const { styleLabel, recommendations } = MOCK_RESULT;

  // "Melancholic Softboy" → "MELANCHOLIC\nSOFTBOY"
  const words = styleLabel.title.toUpperCase().split(" ");
  const mid = Math.ceil(words.length / 2);
  const titleFormatted = [words.slice(0, mid).join(" "), words.slice(mid).join(" ")]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="bg-background">
      <div className="mx-auto px-4 md:px-9 lg:px-[120px] max-w-[1280px] py-12 lg:py-20">
        {/* ── Hero Section ──────────────────────────────────────────────────── */}
        <section className="flex flex-col lg:flex-row lg:items-center gap-10 mb-16 lg:mb-20">
          {/* 텍스트 영역 */}
          <div className="flex flex-col gap-6 flex-1">
            <div>
              <span className="inline-block px-4 py-1 rounded-full bg-primary-container/10 font-korean font-medium text-body-sm text-primary-container">
                • 에스테틱 큐레이션 완료
              </span>
            </div>

            <h1 className="font-headline font-black text-display-sm md:text-display-md lg:text-display-lg text-on-background uppercase leading-none tracking-tighter whitespace-pre-line keep-all">
              {titleFormatted}
            </h1>

            <p className="font-korean font-bold text-body-lg lg:text-title-lg text-on-surface-variant keep-all max-w-[480px]">
              {styleLabel.description}
            </p>

            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="sm">
                공유 카드 만들기
              </Button>
              <Button variant="stroke" size="sm">
                다시 분석하기
              </Button>
            </div>
          </div>

          {/* 캐릭터 플레이스홀더 — TODO: #88 캐릭터 컴포넌트 완성 후 교체 */}
          <div className="flex justify-center lg:justify-end flex-shrink-0">
            <div
              className="w-[240px] h-[240px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px]"
              style={{ background: "#ff8a65", borderRadius: "64px" }}
              aria-hidden="true"
            />
          </div>
        </section>

        {/* ── Domain Sections ───────────────────────────────────────────────── */}
        <div className="flex flex-col gap-16 lg:gap-20 mb-16 lg:mb-20">
          {/* Music Mood */}
          <section>
            <div className="flex items-end justify-between mb-6 lg:mb-8">
              <h2 className="font-headline font-black text-headline-lg text-on-background">
                MUSIC MOOD
              </h2>
              <span className="font-korean font-medium text-body-sm text-on-surface-variant cursor-pointer hover:text-on-background transition-colors">
                전체 플레이리스트
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {recommendations.music.map((track) => (
                <RecommendCard key={track.id} />
              ))}
            </div>
          </section>

          {/* Cinematic Mood */}
          <section>
            <div className="flex items-end justify-between mb-6 lg:mb-8">
              <h2 className="font-headline font-black text-headline-lg text-on-background">
                CINEMATIC MOOD
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {recommendations.movies.map((movie) => (
                <RecommendCard key={movie.id} />
              ))}
            </div>
          </section>

          {/* Fashion Mood */}
          <section>
            <div className="flex items-end justify-between mb-6 lg:mb-8">
              <h2 className="font-headline font-black text-headline-lg text-on-background">
                FASHION MOOD
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {recommendations.fashion.map((item) => (
                <RecommendCard key={item.id} />
              ))}
            </div>
          </section>
        </div>

        {/* ── Export Identity Section ───────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-on-background rounded-xl px-10 py-14 lg:px-16 lg:py-20">
          {/* 배경 장식 텍스트 */}
          <div
            className="absolute bottom-8 left-10 pointer-events-none select-none whitespace-nowrap"
            aria-hidden="true"
          >
            <span className="font-headline font-black text-[72px] leading-none text-white/[0.03]">
              STYLESYNC ARCHIVE
            </span>
          </div>

          <div className="relative flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            {/* 텍스트 + 버튼 */}
            <div className="flex flex-col gap-6 flex-1">
              <h2 className="font-headline font-black text-white text-headline-lg lg:text-[36px] leading-tight uppercase">
                EXPORT
                <br />
                IDENTITY
              </h2>
              <p className="font-korean text-white/60 text-body-sm keep-all max-w-[360px]">
                당신의 디지털 페르소나를 세상에 보여주세요. 이 특별한 결과물을 공유하고 당신과 같은
                스타일 클러스터에 속한 영혼들을 찾아보세요.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="sm">
                  공유 카드 만들기
                </Button>
                <Button variant="stroke" size="sm">
                  다시 분석하기
                </Button>
              </div>
            </div>

            {/* ShareCard 프리뷰 */}
            <div className="w-full lg:w-auto flex justify-center lg:justify-end">
              <ShareCard
                styleTitle={"Melancholic\nSoftboy"}
                inputDomain="music"
                music={{ title: "Blonde", artist: "Frank Ocean" }}
                movie={{ title: "Call Me By Your Name" }}
                fashion={{ keyword: "Oversized Earth Tone Coat" }}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
