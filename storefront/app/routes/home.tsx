import { Link } from "react-router";

import { Heading } from "@/components/ui/text";

import { CACHE_HEADERS } from "@/lib/constants";
import { listProductsWithSort } from "@/lib/data/products";
import { ProductPrice } from "@/modules/products/product-price";

import type { Route } from "./+types/home";

export async function loader({ request }: Route.LoaderArgs) {
  return await listProductsWithSort(request);
}

export function headers() {
  return CACHE_HEADERS;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { response } = loaderData;
  const products = response?.products;

  return (
    <div className="space-y-10">
      <Heading variant="h2">Products</Heading>

      <div className="space-y-4">
        {products?.map((product) => (
          <Link
            prefetch="viewport"
            data-testid="product-wrapper"
            key={product.id}
            to={`/products/${product.handle}`}
            className="flex w-fit gap-3"
          >
            <img
              src={product.thumbnail ?? "/placeholder.svg"}
              className="size-16 rounded-md object-cover"
            />
            <div>
              <Heading variant="h4" data-testid="product-title">
                {product.title}
              </Heading>
              <ProductPrice product={product} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
