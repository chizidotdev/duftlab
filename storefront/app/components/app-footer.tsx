import { Link, href } from "react-router";

import { AppLogo } from "@/components/app-logo";
import { Separator } from "@/components/ui/separator";
import { Heading, Paragraph } from "@/components/ui/text";

import { siteLinks } from "@/lib/constants";

export function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="container border-t">
      <div className="py-12">
        <div className="flex flex-col gap-8 lg:flex-row">
          <section className="max-w-sm space-y-4">
            <AppLogo />
            <Paragraph className="text-muted-foreground text-sm">
              Your trusted fragrance destination featuring premium brands and designer scents.
              Discover your signature fragrance with our curated collection.
            </Paragraph>
          </section>

          <section className="grid w-full max-w-screen-md gap-6 sm:grid-cols-3 lg:ml-auto">
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-4">
                <Heading variant="h4">{section.title}</Heading>
                <nav className="space-y-2">
                  {section.links.map((link) => (
                    <Link
                      key={link.title}
                      to={link.href}
                      target={section.target}
                      className="link w-fit text-sm"
                    >
                      {link.title}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </section>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <Paragraph className="text-muted-foreground text-sm">
            © {currentYear} Duftlab. All rights reserved.
          </Paragraph>
          <Paragraph className="text-sm">
            Website by&nbsp;
            <a
              href="https://chizi.dev?ref=duftlab"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              chizidotdev
            </a>
          </Paragraph>
        </div>
      </div>
    </footer>
  );
}

const footerSections = [
  {
    title: "Shop",
    links: [
      { title: "All Products", href: "/collections/alll" },
      { title: "Body Mist", href: "/categories/body-mist" },
      { title: "Body Spray", href: "/categories/body-spray" },
      { title: "Niche", href: "/categories/niche" },
    ],
  },
  {
    title: "Connect",
    target: "_blank",
    links: [
      { title: "Whatsapp", href: siteLinks.whatsapp },
      { title: "Instagram", href: siteLinks.instagram },
      // { title: "Shipping Info", href: "/shipping" },
      // { title: "Returns & Exchanges", href: "#" },
      // { title: "FAQ", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { title: "Privacy Policy", href: href("/legal/privacy-policy") },
      { title: "Terms of Service", href: "#" },
      // { title: "Cookie Policy", href: "#" },
    ],
  },
];
