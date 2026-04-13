"use client";

interface ButtonProps {
  variant?: "primary" | "dark" | "light";
  children: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export function Button({
  variant = "primary",
  children,
  disabled = false,
  fullWidth = false,
  onClick,
  type = "button",
}: ButtonProps) {
  const styles = {
    primary: "bg-primary-container text-white cta-glow",
    dark: "bg-on-background text-white",
    light: "bg-white text-on-background border border-black/5",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${fullWidth ? "w-full" : "px-10"} py-5
        rounded-full font-bold text-lg
        transition-all duration-300
        hover:scale-105 active:scale-[0.98]
        disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
        ${styles[variant]}
      `}
    >
      {children}
    </button>
  );
}
