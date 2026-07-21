import type { IInputProps } from "@/components/ui/input";

export type IAuthFormField = Pick<
  IInputProps,
  "autoComplete" | "helperText" | "id" | "label" | "name" | "placeholder" | "type"
>;

export interface IAuthFormProps {
  badgeLabel: string;
  title: string;
  description: string;
  submitLabel: string;
  footerLabel: string;
  footerHref: string;
  footerLinkText: string;
  fields: IAuthFormField[];
}
