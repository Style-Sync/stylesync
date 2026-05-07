export interface IExampleButtonProps {
  variant?: "primary" | "dark" | "light";
  children: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}
