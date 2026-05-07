"use client";

import { buttonVariants } from "./button.variants";

import type { IButtonProps } from "./button.types";

export const Button = ({
  variant = "primary",
  children,
  disabled = false,
  fullWidth = false,
  onClick,
  type = "button",
}: IButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${fullWidth ? "w-full" : "px-10"} py-5
        rounded-full font-bold text-lg
        transition-all duration-300
        hover:scale-105 active:scale-[0.98]
        disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
        ${buttonVariants[variant]}
      `}
    >
      {children}
    </button>
  );
};
