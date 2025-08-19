import { Link } from "react-router";

import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading, Paragraph } from "@/components/ui/text";

import { CACHE_HEADERS } from "@/lib/constants";

import type { Route } from "./+types/home";

export async function loader() {}

export function headers() {
  return CACHE_HEADERS;
}

export default function Home({}: Route.ComponentProps) {
  return (
    <>
      <Link
        to="/collections/all"
        className="relative block h-[calc(100dvh-8rem)] overflow-hidden rounded-md transition-all sm:h-[calc(100dvh-10rem)]"
        style={{ backgroundColor: "hsl(220 10% 66%)" }}
      >
        <img
          src="https://ik.imagekit.io/chizidotdev/duftlab/hero-image.png?updatedAt=1755561418664"
          alt="Hero Image"
          className="size-full object-cover object-[75%_bottom] lg:scale-110 lg:object-[center_95%]"
        />
        <div className="absolute inset-x-8 top-[6dvh] space-y-3 text-white sm:inset-x-16 sm:top-[14dvh] xl:inset-x-[10dvw] xl:top-[20dvh]">
          <Heading className="sm:text-5xl">
            Elevate your style <br className="hidden sm:inline" />
            with the perfect scent
          </Heading>
          <Paragraph className="max-w-md">
            Join countless satisfied customers who trust us to deliver timeless fragrances that
            enhance their confidence and personal style.
          </Paragraph>
          <Button className="mt-4">
            Shop now <ChevronRight />
          </Button>
        </div>
      </Link>
    </>
  );
}
