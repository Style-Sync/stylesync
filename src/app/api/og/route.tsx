import { readFile } from "fs/promises";
import path from "path";

import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

// FT-005 공유 카드 스펙 — 9:16(인스타 스토리) + 1200x630(OG 링크 미리보기) 두 사이즈를
// @vercel/og(next/og ImageResponse)로 서버사이드 생성한다.
// html2canvas 기반 클라이언트 캡처(#264)는 화면 뷰포트에 따라 비율이 달라져 스펙을
// 보장할 수 없어 대체되었다. (#87)

const SIZES = {
  story: { width: 1080, height: 1920 },
  og: { width: 1200, height: 630 },
} as const;

type Variant = keyof typeof SIZES;

const FONTS_DIR = path.join(process.cwd(), "src/app/api/og/fonts");

const loadFonts = async () => {
  const [epilogue, plusJakarta, notoSansKR] = await Promise.all([
    readFile(path.join(FONTS_DIR, "Epilogue.ttf")),
    readFile(path.join(FONTS_DIR, "PlusJakartaSans.ttf")),
    readFile(path.join(FONTS_DIR, "NotoSansKR.ttf")),
  ]);

  return [
    { name: "Epilogue", data: epilogue, weight: 900 as const, style: "normal" as const },
    {
      name: "Plus Jakarta Sans",
      data: plusJakarta,
      weight: 800 as const,
      style: "normal" as const,
    },
    { name: "Noto Sans KR", data: notoSansKR, weight: 500 as const, style: "normal" as const },
  ];
};

// 눈 2개 + 입으로 구성된 단순 마스코트 얼굴 (기존 MascotFace SVG와 동일 비율, satori 호환 div 버전)
const MascotFace = ({ scale }: { scale: number }) => (
  <div
    style={{
      position: "relative",
      width: 128 * scale,
      height: 128 * scale,
      display: "flex",
    }}
  >
    <div
      style={{
        position: "absolute",
        left: 44 * scale,
        top: 52 * scale,
        width: 24 * scale,
        height: 24 * scale,
        borderRadius: 12 * scale,
        background: "#1A1C1A",
        display: "flex",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 54 * scale,
        top: 59 * scale,
        width: 6 * scale,
        height: 6 * scale,
        borderRadius: 3 * scale,
        background: "white",
        display: "flex",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 76 * scale,
        top: 52 * scale,
        width: 24 * scale,
        height: 24 * scale,
        borderRadius: 12 * scale,
        background: "#1A1C1A",
        display: "flex",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 86 * scale,
        top: 59 * scale,
        width: 6 * scale,
        height: 6 * scale,
        borderRadius: 3 * scale,
        background: "white",
        display: "flex",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 52 * scale,
        top: 86 * scale,
        width: 24 * scale,
        height: 2 * scale,
        borderRadius: 1 * scale,
        background: "rgba(26,28,26,0.2)",
        display: "flex",
      }}
    />
  </div>
);

type CardData = {
  title: string;
  description: string;
  themeColor: string;
  music: string;
  movie: string;
  fashion: string;
};

const DEFAULTS: CardData = {
  title: "StyleSync",
  description: "음악 × 영화 × 패션, 당신의 취향을 하나로 연결하세요",
  themeColor: "#e6e6fa",
  music: "MUSIC",
  movie: "MOVIE",
  fashion: "FASHION",
};

const readCardData = (searchParams: URLSearchParams): CardData => ({
  title: searchParams.get("title") || DEFAULTS.title,
  description: searchParams.get("description") || DEFAULTS.description,
  themeColor: searchParams.get("themeColor") || DEFAULTS.themeColor,
  music: searchParams.get("music") || DEFAULTS.music,
  movie: searchParams.get("movie") || DEFAULTS.movie,
  fashion: searchParams.get("fashion") || DEFAULTS.fashion,
});

// 9:16 세로형 카드 — FT-005 "카드 내용 구성" 그대로 재현 (인스타 스토리 저장용)
const StoryCard = ({ data }: { data: CardData }) => {
  const bgText = (
    data.title.split(" ")[1] ??
    data.title.split(" ")[0] ??
    "STYLESYNC"
  ).toUpperCase();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "white",
        padding: "60px 48px",
        position: "relative",
      }}
    >
      {/* 배경 세로 텍스트 (rotate로 흉내, writing-mode 미사용) */}
      <div
        style={{
          position: "absolute",
          right: 24,
          top: 120,
          display: "flex",
          transform: "rotate(90deg)",
          transformOrigin: "right top",
        }}
      >
        <span
          style={{
            fontFamily: "Epilogue",
            fontWeight: 900,
            fontSize: 96,
            color: "rgba(26,28,26,0.05)",
            whiteSpace: "nowrap",
          }}
        >
          {bgText}
        </span>
      </div>

      {/* 상단: 라벨 + 타이틀 */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontFamily: "Noto Sans KR",
            fontWeight: 500,
            fontSize: 22,
            color: "rgba(26,28,26,0.3)",
          }}
        >
          STYLE IDENTITY
        </span>
        <span
          style={{
            fontFamily: "Epilogue",
            fontWeight: 900,
            fontSize: 64,
            color: "#1A1C1A",
            marginTop: 12,
            lineHeight: 1.05,
          }}
        >
          {data.title}
        </span>
      </div>

      {/* 마스코트 영역 — Figma ShareCard 실측(240x300 @ 400w 기준) × 스케일 2.7(=1080/400) */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", marginTop: 40 }}>
        <div
          style={{
            position: "relative",
            width: 648,
            height: 810,
            borderRadius: 130,
            background: data.themeColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 346,
              height: 346,
              borderRadius: 173,
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <MascotFace scale={2.7} />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 108,
              display: "flex",
              background: "#FF5C00",
              borderRadius: 9999,
              padding: "22px 54px",
            }}
          >
            <span
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontWeight: 800,
                fontSize: 27,
                color: "white",
                letterSpacing: 2,
              }}
            >
              CURATED FEELS
            </span>
          </div>
        </div>
      </div>

      {/* 하단: 도메인 태그 + 브랜딩 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          borderTop: "1px solid rgba(26,28,26,0.08)",
          paddingTop: 32,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[data.music, data.movie, data.fashion].map((text) => (
            <div
              key={text}
              style={{
                display: "flex",
                alignSelf: "flex-start",
                background: "rgba(26,28,26,0.04)",
                borderRadius: 9999,
                padding: "8px 20px",
              }}
            >
              <span
                style={{
                  fontFamily: "Noto Sans KR",
                  fontWeight: 500,
                  fontSize: 18,
                  color: "rgba(26,28,26,0.7)",
                }}
              >
                {text}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 8 }}>
          <div style={{ display: "flex" }}>
            <span
              style={{ fontFamily: "Epilogue", fontWeight: 900, fontSize: 40, color: "#1A1C1A" }}
            >
              Style
            </span>
            <span
              style={{ fontFamily: "Epilogue", fontWeight: 900, fontSize: 40, color: "#FF5C00" }}
            >
              Sync
            </span>
          </div>
          <span
            style={{
              fontFamily: "Noto Sans KR",
              fontWeight: 500,
              fontSize: 22,
              color: "rgba(26,28,26,0.4)",
            }}
          >
            DIGITAL LOOKBOOK V2.0
          </span>
        </div>
      </div>
    </div>
  );
};

// 1200x630 가로형 — 링크 공유 시 미리보기 전용 (og:image)
const OgCard = ({ data }: { data: CardData }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      background: "white",
      padding: "0 80px",
      gap: 64,
    }}
  >
    <div
      style={{
        width: 300,
        height: 380,
        borderRadius: 60,
        background: data.themeColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 160,
          height: 160,
          borderRadius: 80,
          background: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <MascotFace scale={1.2} />
      </div>
    </div>

    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <div style={{ display: "flex", marginBottom: 16 }}>
        <span style={{ fontFamily: "Epilogue", fontWeight: 900, fontSize: 32, color: "#1A1C1A" }}>
          Style
        </span>
        <span style={{ fontFamily: "Epilogue", fontWeight: 900, fontSize: 32, color: "#FF5C00" }}>
          Sync
        </span>
      </div>
      <span
        style={{
          fontFamily: "Epilogue",
          fontWeight: 900,
          fontSize: 56,
          color: "#1A1C1A",
          lineHeight: 1.1,
        }}
      >
        {data.title}
      </span>
      <span
        style={{
          fontFamily: "Noto Sans KR",
          fontWeight: 500,
          fontSize: 24,
          color: "rgba(26,28,26,0.6)",
          marginTop: 20,
          lineHeight: 1.4,
        }}
      >
        {data.description}
      </span>
    </div>
  </div>
);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const variantParam = searchParams.get("variant");
  const variant: Variant = variantParam === "og" ? "og" : "story";
  const size = SIZES[variant];
  const data = readCardData(searchParams);

  const fonts = await loadFonts();

  return new ImageResponse(variant === "og" ? <OgCard data={data} /> : <StoryCard data={data} />, {
    width: size.width,
    height: size.height,
    fonts,
  });
}
