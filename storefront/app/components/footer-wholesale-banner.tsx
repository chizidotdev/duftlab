import { Button } from "@/components/ui/button";
import { Heading, Paragraph } from "@/components/ui/text";

import { siteLinks } from "@/lib/constants";

export function FooterWholesaleBanner() {
  return (
    <section className="bg-card mt-20 flex flex-col-reverse gap-4 p-4 lg:flex-row">
      <div className="aspect-video flex-1">
        <img
          src="https://ik.imagekit.io/chizidotdev/duftlab/perfume-store.avif"
          alt="Wholesale banner"
          className="size-full rounded-lg object-cover"
        />
      </div>
      <div className="bg-background flex flex-1 flex-col justify-between gap-10 rounded-lg p-6">
        <div className="space-y-2">
          <Heading variant="h2">
            <span className="text-muted-foreground">Got a Perfume Shop?</span>
            <br />
            Need Perfumes in Bulk?
          </Heading>
          <Paragraph>
            Get in touch with our wholesale team! We have over 5 years of sourcing and distributing
            experience that we can’t wait to share with you! Partnering with us gets you access to
            special discounts, authentic products, and a community of friends you can count on to
            help your business succeed!
          </Paragraph>
        </div>

        <div>
          <Button asChild>
            <a href={siteLinks.whatsapp} target="_blank" rel="noopener noreferrer">
              Get in touch
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
