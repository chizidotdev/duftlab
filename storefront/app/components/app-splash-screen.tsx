import { useEffect } from "react";

import { animate, motion, spring, stagger } from "motion/react";

import { cn } from "@/lib/utils";

const letters = [
  { char: "d", className: "" },
  { char: "u", className: "remove" },
  { char: "f", className: "remove" },
  { char: "t", className: "remove" },
  { char: "l", className: "lab" },
  { char: "a", className: "lab remove" },
  { char: "b", className: "lab remove" },
];

export function SplashScreenProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    animate(
      [
        [".intro-char", { opacity: 1, x: -0.01 }, { delay: stagger(0.04), duration: 0.3 }],
        [".lab", { fontWeight: 200 }, { duration: 0.3, ease: "easeInOut" }],
        [
          ".remove",
          { opacity: 0, x: "-100%", width: "0%" },
          { at: "+1", duration: 0.3, delay: stagger(0.04) },
        ],
        [
          ".dots",
          { opacity: 1, y: [-10, 0] },
          { type: spring, stiffness: 300, duration: 0.3, mass: 1.5 },
        ],
        [".intro", { opacity: "0%", y: "-20%" }, { duration: 0.3, ease: "easeInOut" }],
        [".intro", { display: ["grid", "none"] }, { duration: 0.4, ease: "easeInOut" }],
        [".hero-image", { scale: 1 }, { duration: 0.7, ease: "easeOut", at: "<-0.5" }],
      ],
      {
        defaultTransition: {
          onPlay: () => document.body.classList.add("overflow-hidden"),
          onComplete: () => document.body.classList.remove("overflow-hidden"),
        },
      }
    );
  }, []);

  return (
    <>
      {children}

      <div className="intro bg-background fixed inset-0 z-[9999] grid h-dvh place-items-center">
        <p className="flex justify-center text-7xl leading-none font-semibold tracking-tighter">
          {letters.map((l, index) => (
            <motion.span
              key={l.char + index}
              initial={{ opacity: 0, x: -10 }}
              exit="hidden"
              className={cn("intro-char relative", l.className)}
            >
              {l.char}
              {l.char === "l" && (
                <span className="dots absolute -right-px -bottom-2 flex -translate-x-1/2 flex-col gap-1.5 opacity-0">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <span key={i} className="bg-foreground size-1 rounded-full" />
                  ))}
                </span>
              )}
            </motion.span>
          ))}
        </p>
      </div>
    </>
  );
}
