import type { SVGProps } from "react";

export default function Share(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12 4L18 10M18 10H14M18 10V6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M18 14V17C18 18.1046 17.1046 19 16 19H8C6.89543 19 6 18.1046 6 17V9C6 7.89543 6.89543 7 8 7H11"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}
