export type InputSummaryItem = {
  id: string | number;
  name: string;
  imageUrl?: string;
};

export interface IInputSummaryProps {
  items: InputSummaryItem[];
  onRemove: (id: string | number) => void;
  label?: string;
}
