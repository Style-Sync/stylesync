"use client";

import { forwardRef } from "react";

import { cn } from "@/lib/utils";

import { inputHelperVariants, inputVariants } from "./input.variants";

import type { IInputProps } from "./input.types";

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      className,
      fieldClassName,
      helperText,
      label,
      leadingIcon,
      trailingIcon,
      variant = "default",
      disabled = false,
      id,
      ...props
    },
    ref
  ) => {
    const helperId = helperText && id ? `${id}-helper` : undefined;

    return (
      <div className={cn("flex w-full flex-col gap-2", className)}>
        {label ? (
          <label htmlFor={id} className="type-label-xs md:type-label-md text-on-surface-variant">
            {label}
          </label>
        ) : null}

        <div
          className={cn(
            "group flex w-full items-center overflow-hidden border bg-surface-variant transition-colors duration-200",
            "focus-within:border-primary-container",
            "focus-within:bg-surface",
            "disabled:cursor-not-allowed",
            inputVariants[variant],
            disabled && "cursor-not-allowed opacity-50",
            fieldClassName
          )}
        >
          {leadingIcon ? (
            <span className="ml-4 flex shrink-0 items-center text-[#8B908B]" aria-hidden="true">
              {leadingIcon}
            </span>
          ) : null}

          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={variant === "error"}
            aria-describedby={helperId}
            className={cn(
              "w-full bg-transparent text-body-sm text-on-background outline-none placeholder:text-[#B9B3AC]",
              leadingIcon ? "pl-3" : "pl-5",
              trailingIcon ? "pr-3" : "pr-5",
              variant === "search" ? "py-4 font-semibold" : "py-[1.1rem]"
            )}
            {...props}
          />

          {trailingIcon ? (
            <span className="mr-4 flex shrink-0 items-center text-[#8B908B]" aria-hidden="true">
              {trailingIcon}
            </span>
          ) : null}
        </div>

        {helperText ? (
          <p
            id={helperId}
            className={cn(
              "flex items-center gap-1.5 type-label-md-regular",
              inputHelperVariants[variant]
            )}
          >
            {variant === "error" ? (
              <span className="text-error" aria-hidden="true">
                !
              </span>
            ) : null}
            <span>{helperText}</span>
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
