import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { IAuthFormProps } from "./authForm.types";

export const AuthForm = ({
  badgeLabel,
  title,
  description,
  submitLabel,
  footerLabel,
  footerHref,
  footerLinkText,
  fields,
}: IAuthFormProps) => {
  return (
    <section
      className="signup-card-shadow mx-auto w-full max-w-[31.5rem] rounded-[2rem] border border-outline-variant bg-surface"
      aria-labelledby="auth-form-title"
    >
      <div className="px-8 py-8 md:px-12 md:py-10">
        <p className="type-label-md-regular text-on-surface-variant">{badgeLabel}</p>

        <div className="mt-4 space-y-3">
          <h2
            id="auth-form-title"
            className="type-headline-sm text-on-background md:type-headline-md"
          >
            {title}
          </h2>
          <p className="type-body-sm keep-all text-on-surface-variant md:type-body-md">
            {description}
          </p>
        </div>

        <form className="mt-8 space-y-5">
          {fields.map((field) => (
            <Input key={field.id ?? field.name} {...field} />
          ))}

          <Button type="submit" fullWidth size="md" className="mt-3">
            {submitLabel}
          </Button>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 border-t border-outline-variant pt-5 text-center">
          <span className="type-label-md-regular text-on-surface-variant">{footerLabel}</span>
          <Link
            href={footerHref}
            className="type-label-md-regular text-primary-container transition-opacity hover:opacity-70"
          >
            {footerLinkText}
          </Link>
        </div>
      </div>
    </section>
  );
};
