"use client";

import { iconRegistry } from "./Icon.registry";

import type { IIconProps } from "./Icon.types";

export default function Icon({ name, size = 24, className, ...props }: IIconProps) {
  const Component = iconRegistry[name];

  if (!Component) {
    console.warn(`[Icon] "${name}" does not exist.`);

    return null;
  }

  return (
    <Component width={size} height={size} aria-hidden="true" className={className} {...props} />
  );
}
