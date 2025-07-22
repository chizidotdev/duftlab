import { Link } from "react-router";

import { Heading, Paragraph } from "@/components/ui/text";

import { CACHE_HEADERS } from "@/lib/constants";
import { listProductsWithSort } from "@/lib/data/products";
import { ProductPrice } from "@/modules/products/product-price";
import { ProductThumbnail } from "@/modules/products/product-thumbnail";

import type { Route } from "./+types/collections";

export async function loader({ request }: Route.LoaderArgs) {
  return await listProductsWithSort(request);
}

export function headers() {
  return CACHE_HEADERS;
}

export default function Collections({ loaderData, params }: Route.ComponentProps) {
  const { response } = loaderData;
  const products = response?.products;

  const title = params.handle === "all" ? "Shop all" : params.handle;

  return (
    <div className="space-y-10">
      <Heading className="capitalize" variant="h2">
        {title}
      </Heading>

      <div className="grid grid-cols-2 gap-6 lg:grid-cols-3 2xl:grid-cols-4">
        {products?.map((product) => (
          <Link
            prefetch="viewport"
            data-testid="product-wrapper"
            key={product.id}
            to={`/products/${product.handle}`}
            className="flex w-full flex-col gap-3"
          >
            <ProductThumbnail product={product} />
            <div>
              <div className="flex flex-col justify-between sm:flex-row sm:items-center">
                <Paragraph data-testid="product-title">{product.title}</Paragraph>
                <ProductPrice product={product} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
