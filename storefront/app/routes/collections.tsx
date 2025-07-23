import { NavLink } from "react-router";

import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/text";

import { CACHE_HEADERS } from "@/lib/constants";
import { listCollections } from "@/lib/data/collections";
import { listProductsWithSort } from "@/lib/data/products";
import { cn } from "@/lib/utils";
import { ProductPreview } from "@/modules/products/product-preview";

import type { Route } from "./+types/collections";

export async function loader({ request }: Route.LoaderArgs) {
  const [{ response }, collectionsResponse] = await Promise.all([
    listProductsWithSort(request),
    listCollections(),
  ]);
  return { productsResponse: response, collectionsResponse };
}

export function headers() {
  return CACHE_HEADERS;
}

export default function Collections({ loaderData, params }: Route.ComponentProps) {
  const { productsResponse, collectionsResponse } = loaderData;
  const products = productsResponse?.products ?? [];
  const collections = collectionsResponse?.collections ?? [];

  return (
    <div className="mt-6 space-y-10">
      <div className="space-y-3">
        <Heading className="capitalize" variant="h2">
          Shop {params.handle}
        </Heading>

        <Separator />

        <nav className="flex items-center gap-6">
          <NavLink
            className={({ isActive }) => cn("link", isActive && "text-foreground")}
            to={`/collections/all`}
          >
            Shop all
          </NavLink>
          {collections.map((collection) => (
            <NavLink
              key={collection.id}
              className={({ isActive }) => cn("link", isActive && "text-foreground")}
              to={`/collections/${collection.handle}`}
            >
              {collection.title}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-[repeat(auto-fill,minmax(16rem,auto))] md:gap-6 2xl:grid-cols-5">
        {products.map((product) => (
          <ProductPreview key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
