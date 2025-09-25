import { Link } from "react-router";

import { BadgeCheck, Package, RotateCw } from "lucide-react";

import { Heading, Paragraph } from "@/components/ui/text";

import { siteLinks } from "@/lib/constants";

import { AppLogo } from "./app-logo";
import { Separator } from "./ui/separator";

export function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="container mt-20 flex flex-col justify-evenly gap-8 border-t py-20 md:flex-row md:items-center">
        {value.map((v) => (
          <div
            key={v.title}
            className="flex items-center gap-4 md:max-w-sm md:flex-col md:text-center"
          >
            <v.icon className="size-6 lg:size-10" />
            <div className="flex-1">
              <Heading variant="h4">{v.title}</Heading>
              <Paragraph className="text-muted-foreground text-sm">{v.description}</Paragraph>
            </div>
          </div>
        ))}
      </div>

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
                        target="_blank"
                        className="link text-sm"
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
            <div className="flex space-x-6">
              {bottomLinks.map((link) => (
                <Link
                  key={link.title}
                  to={link.href}
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

const value = [
  {
    icon: RotateCw,
    title: "Curated Selection",
    description:
      "Hand-picked premium fragrances from the world's most sought-after brands and fragrances.",
  },
  {
    icon: BadgeCheck,
    title: "Authentic Guarantee",
    description:
      "100% authentic fragrances sourced directly from authorized distributors and brands.",
  },
  {
    icon: Package,
    title: "Expert Service",
    description:
      "Personalized fragrance recommendations and careful packaging to ensure your perfect scent arrives safely.",
  },
];

const footerSections = [
  {
    title: "Shop",
    links: [
      { title: "All Products", href: "/collections" },
      { title: "New Arrivals", href: "/collections" },
      { title: "Best Sellers", href: "/collections" },
      { title: "Sale", href: "/collections" },
    ],
  },
  {
    title: "Customer Service",
    links: [
      { title: "Whatsapp", href: siteLinks.whatsapp },
      { title: "Instagram", href: siteLinks.instagram },
      // { title: "Shipping Info", href: "/shipping" },
      { title: "Returns & Exchanges", href: "/returns" },
      { title: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms of Service", href: "/terms" },
      { title: "Cookie Policy", href: "/cookies" },
    ],
  },
];

const bottomLinks = [
  { title: "Accessibility", href: "/accessibility" },
  { title: "Sitemap", href: "/sitemap" },
];
