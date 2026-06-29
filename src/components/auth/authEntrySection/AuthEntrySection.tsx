"use client";

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
  onSubmit,
  isSubmitting = false,
  errorMessage,
  statusMessage,
  fieldErrors,
}: IAuthEntrySectionProps) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!onSubmit) {
      return;
    }

    await onSubmit(new FormData(event.currentTarget));
  };

  return (
    <section className="flex w-full flex-col items-center">
      <h2 className="heading-section keep-all">{title}</h2>
      <p className="mt-4 type-title-lg text-on-surface-variant">{description}</p>

      <section className="signup-card-shadow mt-8 w-full max-w-[32rem] rounded-[2.5rem] bg-surface px-8 py-8 md:px-12 md:py-12">
        <h3 className="sr-only">{title} 입력 폼</h3>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {fields.map((field) => {
            const fieldKey = field.name ?? field.id ?? "";
            const fieldError = fieldErrors?.[fieldKey];

            return (
              <Input
                key={field.id ?? field.name}
                {...field}
                variant={fieldError ? "error" : "default"}
                helperText={fieldError ?? field.helperText}
              />
            );
          })}

          {errorMessage && (!fieldErrors || Object.keys(fieldErrors).length === 0) ? (
            <p className="type-label-md-regular text-destructive" role="alert">
              {errorMessage}
            </p>
          ) : null}

          {statusMessage ? (
            <p className="type-label-md-regular text-on-surface-variant">{statusMessage}</p>
          ) : null}

          <Button
            fullWidth
            size="md"
            className="mt-2 h-[62px] text-title-lg"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "처리 중..." : submitLabel}
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
