import type { SVGProps } from "react";

export default function Download(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 4V14" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />

      <path
        d="M8 10L12 14L16 10"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path d="M5 18H19" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}
