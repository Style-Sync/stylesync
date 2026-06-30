import { ReactNode } from "react";

import type { Domain } from "@/types/taste";

export interface ITasteInputFormProps {
  title: string;
  description: string;
  searchPlaceholder: string;

  searchQuery: string;
  onSearchChange: (value: string) => void;

  domain: Domain;
  children: ReactNode;

  isNextDisabled?: boolean;
  onNext?: () => void;

  selectionCount?: number;
  maxSelections?: number;
}
