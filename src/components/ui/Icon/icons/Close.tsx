import type { SVGProps } from "react";

export default function Close(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M2.4 15L1 13.6L6.6 8L1 2.4L2.4 1L8 6.6L13.6 1L15 2.4L9.4 8L15 13.6L13.6 15L8 9.4L2.4 15Z"
        fill="currentColor"
        fillOpacity="0.4"
      />
    </svg>
  );
}
