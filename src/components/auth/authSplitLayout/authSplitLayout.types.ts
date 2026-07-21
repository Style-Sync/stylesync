import type { ReactNode } from "react";

import type { IAuthEntryField } from "@/components/auth/authEntrySection";

export interface IAuthSplitLayoutProps {
  entryTitle: string;
  entryDescription: string;
  submitLabel: string;
  footerLabel: string;
  footerHref: string;
  footerLinkText: string;
  fields: IAuthEntryField[];
  leadEyebrow?: string;
  leadTitle?: ReactNode;
  leadHeadline?: string;
  leadDescription?: ReactNode;
  leadMeta?: ReactNode;
  leadVisual?: ReactNode;
}
