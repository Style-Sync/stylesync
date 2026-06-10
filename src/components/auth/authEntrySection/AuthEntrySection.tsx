import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { IAuthEntrySectionProps } from "./authEntrySection.types";

export const AuthEntrySection = ({
  title,
  description,
  submitLabel,
  footerLabel,
  footerHref,
  footerLinkText,
  fields,
}: IAuthEntrySectionProps) => {
  return (
    <section className="flex w-full flex-col items-center">
      <h2 className="heading-section keep-all">{title}</h2>
      <p className="mt-4 type-title-lg text-on-surface-variant">{description}</p>

      <section className="signup-card-shadow mt-8 w-full max-w-[32rem] rounded-[2.5rem] bg-surface px-8 py-8 md:px-12 md:py-12">
        <h3 className="sr-only">{title} 입력 폼</h3>
        <form className="space-y-6">
          {fields.map((field) => (
            <Input key={field.id ?? field.name} {...field} />
          ))}
          <Button fullWidth size="md" className="mt-2 h-[62px] text-title-lg">
            {submitLabel}
          </Button>
        </form>
      </section>

      <div className="mt-8 flex items-center gap-2">
        <span className="type-title-sm text-on-background">{footerLabel}</span>
        <Link href={footerHref} className="type-title-sm text-on-background">
          {footerLinkText}
        </Link>
      </div>

      <Link
        href="#"
        className="mt-6 inline-flex items-center gap-2 type-label-md-regular text-on-background"
      >
        비회원으로 계속하기
      </Link>
    </section>
  );
};
