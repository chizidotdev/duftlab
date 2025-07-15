import * as React from "react";

export interface AppLogoProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  size?: number;
  showText?: boolean;
}

export function AppLogo({ size = 20, showText, ...props }: AppLogoProps) {
  return (
    <span className="font-display flex items-center gap-2 font-semibold">
      <svg
        width={size}
        height={size}
        viewBox="0 0 300 315"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M86.737.007c0-1.422-88.142 218.932-86.72 218.932 1.422 0 63.973 1.422 65.395 0 1.422-1.421 19.904-54.022 22.747-54.022s59.708 149.272 61.13 149.272c1.422 0 1.422-1.422 1.422-1.422s32.698-76.768 32.698-79.611C183.408 230.313 86.737 1.428 86.737.006zM176.3 82.462C176.301 81.04 207.577.007 210.42.007c2.843 0 90.985 218.932 89.563 220.354-1.422 1.422-66.817 1.422-68.239 0-1.421-1.422-55.444-136.477-55.444-137.9z"
          className="fill-foreground"
        />
      </svg>
      <span className={showText ? "" : "sr-only"}>SHOP</span>
    </span>
  );
}
