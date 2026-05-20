import type React from "react";

import type { IconName } from "./Icon.registry";

export interface IIconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number | string;
}

export type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;
