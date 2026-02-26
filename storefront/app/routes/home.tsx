import { Link } from "react-router";

import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Heading, Paragraph } from "@/components/ui/text";

import { CACHE_HEADERS } from "@/lib/constants";
import { listCollections } from "@/lib/data/collections";
import { listProductsWithSort } from "@/lib/data/products";
import { ProductPreview } from "@/modules/products/product-preview";

import type { Route } from "./+types/home";

export async function loader({ request }: Route.LoaderArgs) {
  const collectionsResponse = await listCollections();
  const collections = collectionsResponse?.collections;

  const collectionProducts = await Promise.all(
    collections.map(async (collection) => {
      const products = await listProductsWithSort(request, {
        page: 1,
        queryParams: {
          limit: 8,
          collection_id: [collection.id],
        },
        sortBy: "-created_at",
      });
      return { collection, products: products.response.products };
    })
  );

  return { collectionProducts };
}

export function headers() {
  return CACHE_HEADERS;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { collectionProducts } = loaderData;

  return (
    <div className="space-y-10">
      <Link
        to="/collections/all"
        className="relative -mx-4 block h-[calc(100dvh-6rem)] overflow-hidden transition-all sm:-mx-6 sm:h-[calc(100dvh-7rem)] sm:max-h-240"
        style={{ backgroundColor: "hsl(220 10% 66%)" }}
      >
        <motion.img
          src="https://ik.imagekit.io/chizidotdev/duftlab/hero-image.png?updatedAt=1770395487213"
          alt="Elegant fragrance bottles collection showcasing premium designer fragrances at Duftlab"
          className="hero-image size-full object-cover object-[75%_bottom] lg:object-[center_95%]"
          initial={{ scale: 1.1 }}
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

      <div className="space-y-10 pb-10">
        {collectionProducts.map(({ collection, products }) => (
          <section key={collection.id} className="space-y-6">
            <hgroup className="flex items-center justify-between">
              <Heading variant="h2">{collection.title}</Heading>
              <Link to="/collections/all" className="link">
                View all
              </Link>
            </hgroup>

            <div className="products-grid">
              {products.map((product) => (
                <ProductPreview key={product.id} product={product} />
              ))}
            </div>

            <div className="flex justify-center pt-6">
              <Button asChild variant="outline">
                <Link to="/collections/all">View all</Link>
              </Button>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
