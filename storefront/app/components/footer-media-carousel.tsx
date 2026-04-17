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

      <a href="https://www.instagram.com/duftlabdrops" target="_blank">
        <Carousel opts={{ loop: true }} plugins={[Autoplay({ stopOnInteraction: false })]}>
          <CarouselContent className="">
            {mediaItems.map((item) => (
              <CarouselItem
                key={item.src}
                className="bg-card relative ml-1 aspect-9/16 h-80 sm:h-120 lg:h-[50dvh]"
              >
                <video
                  className="absolute inset-0 rounded object-cover"
                  playsInline
                  loop
                  autoPlay
                  muted
                  preload="auto"
                >
                  <source type="video/mp4" src={item.src} />
                  Your browser does not support the video tag.
                </video>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </a>
    </div>
  );
}

const mediaItems = [
  {
    alt: "",
    src: "https://ik.imagekit.io/chizidotdev/duftlab/IMG_4007_DhyESxJIn.MP4",
  },
  {
    alt: "",
    src: "https://ik.imagekit.io/chizidotdev/duftlab/Glass%20Frame_%20For%20every%20mood,%20there_s%20a%20match_lDI6hnP4N.mp4",
  },
  {
    alt: "",
    src: "https://ik.imagekit.io/chizidotdev/duftlab/Angel%20Running%20_%20Feels%20like%20a%20steal_kPN97G8hq.mp4",
  },
  {
    alt: "",
    src: "https://ik.imagekit.io/chizidotdev/duftlab/IMG_4008_5ikzaywpG.MP4",
  },
  {
    alt: "",
    src: "https://ik.imagekit.io/chizidotdev/duftlab/Packed%20with%20care,%20sealed%20with%20love_YcWrHDb3p.mp4",
  },
  {
    alt: "",
    src: "https://ik.imagekit.io/chizidotdev/duftlab/SAMMY%20_%20From%20screen%20to%20door,%20from%20desk%20to%20doorsteps,%20your%20signature%20scents%20delivered%20anywhere%20with%20duftlab_usE7ZgD_X.mp4",
  },
  {
    alt: "",
    src: "https://ik.imagekit.io/chizidotdev/duftlab/Winnie%20_%20Some%20scents%20travel%20farther%20than%20words_k6ph_uOae.mp4",
  },
  {
    alt: "",
    src: "https://ik.imagekit.io/chizidotdev/duftlab/Winnie%20GRWM%20_%20Get%20ready%20with%20your%20signature%20scents%20from%20duftlab_3tc7KveCw.mp4",
  },
];
