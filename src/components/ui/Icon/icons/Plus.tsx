import type { SVGProps } from "react";

export default function Plus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7 9H1V7H7V1H9V7H15V9H9V15H7V9Z" fill="currentColor" />
    </svg>
  );
}
