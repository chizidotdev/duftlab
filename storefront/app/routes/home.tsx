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
        className="relative block h-[calc(100dvh-8rem)] overflow-hidden rounded-md bg-[hsl(220,10%,65%)] transition-all sm:h-[calc(100dvh-10rem)]"
      >
        <img
          src="https://ik.imagekit.io/chizidotdev/duftlab/hero-image.png"
          alt="Hero Image"
          className="size-full object-cover object-[75%_13dvh] lg:scale-110 lg:object-center"
        />
        <div className="absolute inset-x-8 top-[6dvh] w-fit space-y-2 text-white sm:inset-x-16 sm:top-[14dvh] xl:inset-x-[10dvw] xl:top-[20dvh]">
          <Heading className="sm:text-5xl">
            Elevate your style <br className="hidden sm:inline" />
            with the perfect scent
          </Heading>
          <Paragraph className="max-w-md">
            Join countless satisfied customers who trust us to deliver timeless fragrances that
            enhance their confidence and personal style.
          </Paragraph>
          <Button className="mt-2">
            Shop now <ChevronRight />
          </Button>
        </div>
      </Link>
    </>
  );
}
