import { BadgeCheck, Package, RotateCw } from "lucide-react";

import { Heading, Paragraph } from "@/components/ui/text";

export function FooterValueProps() {
  return (
    <div className="container flex flex-col justify-evenly gap-8 border-t py-20 md:flex-row md:items-center">
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
