import Autoplay from "embla-carousel-autoplay";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

import { Heading, Paragraph } from "./ui/text";

export function FooterMediaCarousel() {
  return (
    <div className="container mt-20 space-y-6">
      <hgroup className="flex flex-wrap items-end justify-between gap-2">
        <div className="max-w-xl">
          <Heading variant="h2">Join us on Instagram</Heading>
          <Paragraph className="text-muted-foreground">
            Explore our latest fragrance drops, exclusive behind-the-scenes content, and connect
            with our vibrant community of scent lovers.
          </Paragraph>
        </div>

        <a href="https://www.instagram.com/duftlabdrops" target="_blank" className="text-base">
          <span className="text-muted-foreground hidden lg:inline">Follow us on Instagram</span>{" "}
          @duftlabdrops
        </a>
      </hgroup>

      <Carousel opts={{ loop: true }} plugins={[Autoplay({ stopOnInteraction: false })]}>
        <CarouselContent className="">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <CarouselItem
              key={num}
              className="bg-card relative ml-1 aspect-9/16 h-80 rounded sm:h-120 lg:h-[50dvh]"
            >
              <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-500">
                Image {num}
              </span>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
