export interface IDomainSelectCardProps {
  domain: "music" | "movie" | "fashion";
  selected?: boolean;
  onClick?: () => void;
}
