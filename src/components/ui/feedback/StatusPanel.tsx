import { Button } from "@/components/ui/button";

type StatusPanelVariant = "loading" | "error" | "empty";
type StatusPanelSize = "compact" | "page";

type StatusPanelProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  size?: StatusPanelSize;
  variant?: StatusPanelVariant;
};

const VARIANT_STYLES: Record<StatusPanelVariant, { badge: string; title: string }> = {
  loading: {
    badge: "bg-primary-container/15 text-primary-container",
    title: "text-on-background",
  },
  error: {
    badge: "bg-destructive/10 text-destructive",
    title: "text-on-background",
  },
  empty: {
    badge: "bg-surface-variant text-on-surface-variant",
    title: "text-on-background",
  },
};

const BADGE_LABEL: Record<StatusPanelVariant, string> = {
  loading: "LOADING",
  error: "ERROR",
  empty: "EMPTY",
};

export const StatusPanel = ({
  title,
  description,
  actionLabel,
  onAction,
  size = "page",
  variant = "empty",
}: StatusPanelProps) => {
  const styles = VARIANT_STYLES[variant];
  const isPage = size === "page";

  return (
    <section
      className={
        isPage
          ? "flex min-h-[60vh] flex-col items-center justify-center rounded-lg bg-surface px-6 py-12 text-center"
          : "col-span-full flex min-h-[220px] flex-col items-center justify-center rounded-lg border border-outline-variant bg-surface px-6 py-10 text-center"
      }
      role={variant === "error" ? "alert" : "status"}
      aria-live={variant === "error" ? "assertive" : "polite"}
    >
      <span className={`rounded-full px-3 py-1 type-label-sm ${styles.badge}`}>
        {BADGE_LABEL[variant]}
      </span>
      <h2 className={`mt-4 type-headline-sm ${styles.title}`}>{title}</h2>
      {description ? (
        <p className="mt-3 max-w-[32rem] type-body-md keep-all text-on-surface-variant">
          {description}
        </p>
      ) : null}
      {actionLabel && onAction ? (
        <Button className="mt-6" variant="stroke" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </section>
  );
};
