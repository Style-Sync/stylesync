"use client";

import { cn } from "@/lib/utils";

import { IButton } from "./Button.types";
import { buttonVariants } from "./button.variants";

export const Button = ({
  variant,
  size,
  fullWidth,
  icon,
  iconPosition = "right",
  className,
  children,
  type = "button",
  ...props
}: IButton) => {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className="shrink-0 flex items-center">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="shrink-0 flex items-center">{icon}</span>
      )}
    </button>
  );
};
