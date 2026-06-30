import type { IInputProps } from "@/components/ui/input";

export type IAuthEntryField = Pick<
  IInputProps,
  "autoComplete" | "helperText" | "id" | "label" | "name" | "placeholder" | "type"
>;

export interface IAuthEntrySectionProps {
  title: string;
  description: string;
  submitLabel: string;
  footerLabel: string;
  footerHref: string;
  footerLinkText: string;
  fields: IAuthEntryField[];
}
