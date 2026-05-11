"use client";

import { domainSelectCardVariants } from "./domainSelectCard.variants";

import type { IDomainSelectCardProps } from "./domainSelectCard.types";

// ── Domain Icons ──────────────────────────────────────────────────────────────

const MusicIcon = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M60 10L28 18V52"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="20" cy="58" r="8" stroke="white" strokeWidth="4" />
    <circle cx="52" cy="50" r="8" stroke="white" strokeWidth="4" />
    <path d="M28 18V52" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <path d="M60 10V44" stroke="white" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const MovieIcon = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect x="8" y="20" width="64" height="44" rx="4" stroke="white" strokeWidth="4" />
    <path d="M8 32H72" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <path d="M8 52H72" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <path d="M24 20L16 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <path d="M40 20L32 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <path d="M56 20L48 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <path d="M72 20L64 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <path d="M8 10H72" stroke="white" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const FashionIcon = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M40 10C40 10 28 18 14 22L22 34L26 30V68H54V30L58 34L66 22C52 18 40 10 40 10Z"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M5 12H19M19 12L13 6M19 12L13 18"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M4 10L8 14L16 6"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const domainIcons: Record<"music" | "movie" | "fashion", React.FC> = {
  music: MusicIcon,
  movie: MovieIcon,
  fashion: FashionIcon,
};

// ── Component ─────────────────────────────────────────────────────────────────

export const DomainSelectCard = ({ domain, selected = false, onClick }: IDomainSelectCardProps) => {
  const variant = domainSelectCardVariants[domain];
  const Icon = domainIcons[domain];

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={`${variant.title} 도메인 선택`}
      className={[
        // Layout
        "relative flex flex-col overflow-hidden text-left",
        // Size — mobile: full-width / tablet: 224px / desktop: 384px
        "w-full h-[434px]",
        "md:w-[224px] md:h-[320px]",
        "lg:w-[384px] lg:h-[512px]",
        // Shape
        "rounded-[2rem]",
        // Transitions
        "transition-all duration-300",
        // Hover
        "hover:scale-[1.02] hover:editorial-shadow",
        // Selected ring
        selected
          ? "ring-2 ring-primary-container shadow-[0_0_0_4px_rgba(255,92,0,0.15)]"
          : "editorial-shadow",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* ── Icon Area ─────────────────────────────────────────────────────── */}
      <div className="relative flex flex-1 min-h-0 items-center justify-center bg-on-background">
        {/* Domain icon */}
        <div className="flex items-center justify-center w-[180px] h-[180px] md:w-[100px] md:h-[100px] lg:w-[180px] lg:h-[180px]">
          <Icon />
        </div>

        {/* Selected badge */}
        {selected && (
          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
            <CheckIcon />
          </div>
        )}
      </div>

      {/* ── Content Area ──────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-1 px-6 pt-5 pb-6 md:px-4 md:pt-4 md:pb-5 lg:px-6 lg:pt-5 lg:pb-6 bg-surface-variant">
        {/* Label */}
        <span className="type-label-md text-primary-container">{variant.label}</span>

        {/* Title + Arrow row */}
        <div className="flex items-end justify-between gap-2">
          <h3
            className={[
              "font-headline font-black tracking-tighter keep-all",
              "text-headline-sm md:text-[18px] lg:text-headline-md",
              "text-on-background leading-tight",
            ].join(" ")}
          >
            {variant.title}
          </h3>

          {/* Arrow button */}
          <div
            className={[
              "shrink-0 flex items-center justify-center rounded-full bg-primary-container",
              "w-14 h-14 md:w-10 md:h-10 lg:w-14 lg:h-14",
              "transition-transform duration-200 group-hover:translate-x-1",
            ].join(" ")}
            aria-hidden="true"
          >
            <ArrowIcon />
          </div>
        </div>
      </div>
    </button>
  );
};
