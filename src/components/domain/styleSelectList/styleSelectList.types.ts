import type { Domain } from "@/types/taste";

export interface IStyleOption {
  id: string;
  title: string;
}

export interface IStyleSelectListProps {
  domain: Domain;
  options: IStyleOption[];
}
