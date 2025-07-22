import * as React from "react";

import { cn } from "@/lib/utils";

export interface AppLogoProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  size?: number;
  showText?: boolean;
}

export function AppLogo({ className, ...props }: AppLogoProps) {
  return (
    <div
      className={cn("flex w-fit items-center gap-2 font-serif text-lg font-semibold", className)}
      {...props}
    >
      <span>DUFTLAB</span>
    </div>
  );
}
