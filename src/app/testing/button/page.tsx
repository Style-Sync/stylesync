import { ArrowRight, RefreshCw, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="flex flex-col gap-4">
    <h2 className="font-headline font-black text-title-sm text-on-surface-variant uppercase tracking-widest border-b border-outline-variant pb-2">
      {title}
    </h2>
    {children}
  </section>
);

const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-wrap items-center gap-4">{children}</div>
);

export default function ButtonTestPage() {
  return (
    <main className="min-h-screen bg-background px-8 py-12 flex flex-col gap-12 max-w-3xl mx-auto">
      <header>
        <h1 className="font-headline font-black text-headline-sm text-on-background">
          Button — 변형 테스트
        </h1>
        <p className="mt-1 text-body-sm text-on-surface-variant">
          variant · size · icon · fullWidth · disabled
        </p>
      </header>

      {/* ── Variants ──────────────────────────────────────────── */}
      <Section title="Variants (md)">
        <Row>
          <Button variant="primary">primary</Button>
          <Button variant="stroke">stroke</Button>
          <Button variant="dark">dark</Button>
          <Button variant="light">light</Button>
          <Button variant="ghost">ghost</Button>
        </Row>
      </Section>

      {/* ── Sizes ─────────────────────────────────────────────── */}
      <Section title="Sizes (primary)">
        <Row>
          <Button size="sm">sm · 14px</Button>
          <Button size="md">md · 18px</Button>
          <Button size="lg">lg · 20px Bold</Button>
        </Row>
      </Section>

      {/* ── Icons ─────────────────────────────────────────────── */}
      <Section title="With Icon">
        <Row>
          <Button icon={<ArrowRight size={16} />}>지금 시작하기</Button>
          <Button variant="stroke" icon={<ArrowRight size={16} />}>
            둘러보기
          </Button>
          <Button variant="light" size="sm" icon={<Share2 size={18} />} iconPosition="left">
            Instagram 공유
          </Button>
          <Button variant="dark" size="sm" icon={<Share2 size={18} />} iconPosition="left">
            Twitter 공유
          </Button>
        </Row>
      </Section>

      {/* ── Full Width ────────────────────────────────────────── */}
      <Section title="Full Width">
        <Button fullWidth icon={<ArrowRight size={16} />}>
          메일함으로 이동
        </Button>
        <Button variant="stroke" fullWidth icon={<RefreshCw size={16} />}>
          메일 다시 받기
        </Button>
        <Button variant="ghost" fullWidth>
          나중에 할게요 →
        </Button>
      </Section>

      {/* ── Hero CTA ──────────────────────────────────────────── */}
      <Section title="Hero CTA (lg)">
        <Button size="lg" icon={<ArrowRight size={24} />}>
          첫 취향 분석 시작하기
        </Button>
      </Section>

      {/* ── Disabled ──────────────────────────────────────────── */}
      <Section title="Disabled">
        <Row>
          <Button disabled>primary</Button>
          <Button variant="stroke" disabled>
            stroke
          </Button>
          <Button variant="dark" disabled>
            dark
          </Button>
        </Row>
      </Section>

      {/* ── Dark background ───────────────────────────────────── */}
      <Section title="On Dark Background">
        <div className="bg-inverse-surface rounded-2xl p-6 flex flex-wrap gap-4">
          <Button variant="primary" icon={<ArrowRight size={16} />}>
            지금 시작하기
          </Button>
          <Button variant="stroke">둘러보기</Button>
          <Button variant="light" size="sm">
            light on dark
          </Button>
          <Button variant="ghost" size="sm">
            나중에 할게요 →
          </Button>
        </div>
      </Section>
    </main>
  );
}
