import { useEffect } from "react";

import { AnimatePresence, animate, motion, spring } from "motion/react";

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
    document.body.classList.add("overflow-hidden");

    animate(
      ".lab",
      { fontWeight: [600, 200] },
      {
        ease: "easeInOut",
        duration: 0.4,
        delay: 0.5,
        onComplete: () => {
          animate(
            ".remove",
            { opacity: [1, 0], x: [0, "-100%"], width: ["auto", "0%"] },
            {
              duration: 0.5,
              delay: (x) => x * 0.05 + 0.75,
              opacity: { delay: 0.9 },
              onComplete: () => {
                animate(
                  ".dots",
                  { opacity: [0, 1], y: [-10, 0] },
                  {
                    type: spring,
                    stiffness: 300,
                    duration: 0.4,
                    delay: 0.1,
                    mass: 1.5,
                    onComplete: () => {
                      document.body.classList.remove("overflow-hidden");
                      animate(
                        ".intro",
                        { opacity: ["100%", "0%"], y: [0, "-100%"] },
                        {
                          delay: 0.5,
                          opacity: { duration: 0.75 },
                          y: { duration: 0.4 },
                          ease: "easeInOut",
                        }
                      );
                    },
                  }
                );
              },
            }
          );
        },
      }
    );
  }, []);

  return (
    <AnimatePresence>
      {children}

      <motion.div className="intro bg-background fixed inset-0 z-[9999] grid h-dvh place-items-center">
        <p className="flex justify-center text-7xl leading-none font-semibold tracking-tighter">
          {letters.map((l, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, x: -17 }}
              animate={{ opacity: 1, x: 0 }}
              exit="hidden"
              transition={{ delay: index * 0.06, duration: 0.25, ease: "easeIn" }}
              className={cn("char relative", l.className)}
            >
              {l.char}
              {l.char === "l" && (
                <motion.span className="dots absolute -right-px -bottom-2 flex -translate-x-1/2 flex-col gap-1.5 opacity-0">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <span className="bg-foreground size-1 rounded-full" key={i} />
                  ))}
                </motion.span>
              )}
            </motion.span>
          ))}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
