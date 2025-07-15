import * as React from "react";

export interface AppLogoProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  size?: number;
  showText?: boolean;
}

export function AppLogo({ size = 20, showText, ...props }: AppLogoProps) {
  return (
    <div className="flex items-center gap-2 font-serif text-lg font-semibold">
      <span>SHOP</span>
    </div>
  );
}
