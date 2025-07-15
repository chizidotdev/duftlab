import { Suspense } from "react";
import { Await, Link } from "react-router";

import type { HttpTypes } from "@medusajs/types";

import { Heading } from "@/components/ui/text";

import { CACHE_HEADERS } from "@/lib/constants";
import { listProductsWithSort } from "@/lib/data/products";
import { ProductPrice } from "@/modules/products/product-price";

import type { Route } from "./+types/home";

export function loader({ request }: Route.LoaderArgs) {
  const productsResponse = listProductsWithSort(request);
  return { productsResponse };
}

export function headers() {
  return CACHE_HEADERS;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { productsResponse } = loaderData;

  return (
    <div className="space-y-10">
      <Heading variant="h2">Products</Heading>

      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={productsResponse}>
          {(value) => <ProductsList products={value.response.products} />}
        </Await>
      </Suspense>
    </div>
  );
}

function ProductsList({ products }: { products: HttpTypes.StoreProduct[] }) {
  return (
    <div className="space-y-4">
      {products?.map((product) => (
        <Link
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
  );
}
