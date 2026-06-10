import { AuthEntrySection } from "@/components/auth/authEntrySection";

import type { IAuthSplitLayoutProps } from "./authSplitLayout.types";

export const AuthSplitLayout = ({
  entryTitle,
  entryDescription,
  submitLabel,
  footerLabel,
  footerHref,
  footerLinkText,
  fields,
  leadEyebrow,
  leadTitle,
  leadHeadline,
  leadDescription,
  leadMeta,
  leadVisual,
}: IAuthSplitLayoutProps) => {
  return (
    <section className="grid grid-cols-1 items-start gap-12 lg:mt-0 lg:grid-cols-[1fr_512px] lg:items-center lg:justify-between lg:gap-20">
      <section className="hidden text-center lg:flex flex-col items-center">
        {leadEyebrow ? <p className="type-headline-sm text-[#d4d0ca]">{leadEyebrow}</p> : null}

        {leadTitle ? (
          <div className="font-headline text-[5.6rem] font-black leading-[0.92] tracking-[-0.06em] text-on-background">
            {leadTitle}
          </div>
        ) : null}

        {leadHeadline ? (
          <p className="mt-10 text-[2.2rem] font-bold tracking-[-0.05em] text-on-background">
            {leadHeadline}
          </p>
        ) : null}

        {leadDescription ? (
          <div className="mt-4 max-w-[22rem] type-title-sm text-on-surface-variant">
            {leadDescription}
          </div>
        ) : null}

        {leadMeta ? <div className="mt-8">{leadMeta}</div> : null}
        {leadVisual ? <div className="mt-20">{leadVisual}</div> : null}
      </section>

      <section className="mx-auto flex w-full max-w-[32rem] flex-col items-center text-center lg:mx-0 lg:max-w-none">
        <AuthEntrySection
          title={entryTitle}
          description={entryDescription}
          submitLabel={submitLabel}
          footerLabel={footerLabel}
          footerHref={footerHref}
          footerLinkText={footerLinkText}
          fields={fields}
        />
      </section>
    </section>
  );
};
