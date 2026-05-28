import type { SVGProps } from "react";

export default function CheckCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="12" y="2" width="24" height="24" rx="12" fill="currentColor" />
      <g filter="url(#filter0_dd_454_1441)">
        <rect
          x="12"
          y="2"
          width="24"
          height="24"
          rx="12"
          fill="white"
          fillOpacity="0.01"
          shapeRendering="crispEdges"
        />
      </g>
      <path
        d="M21.9582 19.6875L16.5415 14.2708L18.4165 12.3958L21.9582 15.9375L29.5832 8.3125L31.4582 10.1875L21.9582 19.6875Z"
        fill="white"
      />
      <defs>
        <filter
          id="filter0_dd_454_1441"
          x="0"
          y="0"
          width="48"
          height="48"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="4"
            operator="erode"
            in="SourceAlpha"
            result="effect1_dropShadow_454_1441"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.360784 0 0 0 0 0 0 0 0 0.4 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_454_1441" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="3"
            operator="erode"
            in="SourceAlpha"
            result="effect2_dropShadow_454_1441"
          />
          <feOffset dy="10" />
          <feGaussianBlur stdDeviation="7.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.360784 0 0 0 0 0 0 0 0 0.4 0" />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_454_1441"
            result="effect2_dropShadow_454_1441"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_454_1441"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
