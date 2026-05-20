export const inputVariants: Record<"default" | "error" | "search", string> = {
  default: "min-h-14 rounded-2xl border-transparent",
  error:
    "min-h-14 rounded-2xl border-error bg-[#FFF6F6] focus-within:border-error focus-within:bg-[#FFF6F6]",
  search: "min-h-14 rounded-full border-outline-variant bg-surface",
};

export const inputHelperVariants: Record<"default" | "error" | "search", string> = {
  default: "text-on-surface-variant",
  error: "text-error",
  search: "text-on-surface-variant",
};
