import { RecommendCard } from "@/components/result/recommendCard";
import { ShareCard } from "@/components/result/shareCard";
import type { StyleResult } from "@/types/result";

// ── Mock data (shell 단계 — 실제 API 연동 시 제거) ───────────────────────────
const MOCK_RESULT: StyleResult = {
  id: "mock-1",
  styleLabel: {
    title: "Melancholic Softboy",
    description: "감성적이고 내향적인 무드. R&B와 아트하우스 영화, 오버사이즈 어스톤 패션이 어울림",
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
  // TODO: params.id로 API에서 실제 데이터 fetch
  const { styleLabel, recommendations } = MOCK_RESULT;

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto px-4 md:px-9 lg:px-[120px] py-8 lg:py-12 max-w-[1280px]">
        {/* ── Hero Section ──────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden rounded-2xl bg-surface border border-outline-variant/20 p-8 lg:p-10 mb-8 lg:mb-12">
          {/* Decorative circles */}
          <div
            className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-primary-container/10 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-primary-container/5 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* 캐릭터 플레이스홀더 — TODO: #88 캐릭터 컴포넌트 완성 후 교체 */}
            <div
              className="w-[200px] h-[200px] lg:w-[248px] lg:h-[248px] rounded-full flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #FF5C00, #fdba74)" }}
              aria-hidden="true"
            />

            {/* StyleLabel 텍스트 */}
            <div className="flex flex-col gap-4 text-center lg:text-left">
              <p className="font-label text-label-md text-on-surface-variant uppercase tracking-widest">
                Music · Movie · Fashion
              </p>

              <h1 className="font-headline font-black text-display-sm lg:text-display-md text-on-background leading-none tracking-tighter keep-all">
                {styleLabel.title}
              </h1>

              <p className="font-body text-body-md text-on-surface-variant keep-all max-w-[500px]">
                {styleLabel.description}
              </p>

              {/* Mood 태그 — energy / tone / aesthetic */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {Object.values(styleLabel.mood).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full border border-outline-variant text-label-md text-on-surface-variant"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Recommendations Section ───────────────────────────────────────── */}
        <section className="mb-8 lg:mb-12">
          <h2 className="font-headline font-black text-headline-md text-on-background mb-6">
            추천 콘텐츠
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Music */}
            <div className="flex flex-col gap-4">
              <h3 className="font-headline font-black text-headline-sm text-on-background">
                Music
              </h3>
              {recommendations.music.map((track) => (
                <RecommendCard key={track.id} />
              ))}
            </div>

            {/* Movie */}
            <div className="flex flex-col gap-4">
              <h3 className="font-headline font-black text-headline-sm text-on-background">
                Movie
              </h3>
              {recommendations.movies.map((movie) => (
                <RecommendCard key={movie.id} />
              ))}
            </div>

            {/* Fashion */}
            <div className="flex flex-col gap-4">
              <h3 className="font-headline font-black text-headline-sm text-on-background">
                Fashion
              </h3>
              {recommendations.fashion.map((item) => (
                <RecommendCard key={item.id} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Share Section ─────────────────────────────────────────────────── */}
        <section className="flex flex-col items-center gap-6 pb-12">
          <ShareCard />

          {/* TODO: Button 컴포넌트 완성 후 교체 */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button className="px-8 py-3 rounded-full bg-primary-container text-on-primary font-body font-semibold text-body-md">
              공유하기
            </button>
            <button className="px-8 py-3 rounded-full border border-outline-variant text-on-background font-body font-semibold text-body-md">
              다시 테스트
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
