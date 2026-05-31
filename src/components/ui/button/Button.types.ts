import type { ButtonHTMLAttributes, ReactNode } from "react";

import { buttonVariants } from "./button.variants";

import type { VariantProps } from "class-variance-authority";

export interface IButton
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}
