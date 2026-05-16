import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center rounded-full",
    "font-korean whitespace-nowrap cursor-pointer select-none",
    "transition-all duration-200 active:scale-[0.98]",
    "disabled:opacity-40 disabled:pointer-events-none",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: "bg-primary-container text-on-primary hover:opacity-90",
        stroke:
          "border border-primary-container text-primary-container hover:bg-primary-container/5",
        dark: "bg-on-background text-surface hover:opacity-90",
        light:
          "bg-surface text-on-background shadow-[0px_4px_8px_rgba(12,12,13,0.1)] hover:opacity-90",
        ghost: "text-on-surface-variant hover:text-on-background",
      },
      size: {
        sm: "h-12 px-8 gap-2 font-medium",
        md: "py-5 px-10 gap-3 font-normal",
        lg: "py-10 px-32 gap-4 font-bold",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);
