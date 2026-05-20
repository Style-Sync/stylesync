import type { InputHTMLAttributes, ReactNode } from "react";

export interface IInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: "default" | "error" | "search";
  label?: string;
  helperText?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  fieldClassName?: string;
}
