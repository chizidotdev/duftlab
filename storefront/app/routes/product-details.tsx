import { Link } from "react-router";

import type { HttpTypes } from "@medusajs/types";

import { Heading, Paragraph } from "@/components/ui/text";

import { CACHE_HEADERS } from "@/lib/constants";
import { listProducts } from "@/lib/data/products";
import { ProductActions } from "@/modules/products/product-actions";
import { ProductPrice } from "@/modules/products/product-price";

import type { Route } from "./+types/product-details";

export async function loader({ request, params }: Route.LoaderArgs) {
  const product = await listProducts(request, {
    queryParams: { handle: params.handle },
  }).then(({ response }) => response.products[0]);

  return { product };
}

export function headers() {
  return CACHE_HEADERS;
}

export default function ProductDetails({ loaderData }: Route.ComponentProps) {
  const { product } = loaderData;

  return (
    <div className="space-y-6">
      <div>
        <Link to="/">Go back</Link>
      </div>

      <ProductInfo product={product} />
    </div>
  );
}

function ProductInfo({ product }: { product: HttpTypes.StoreProduct }) {
  if (!product) return <>{/*404 product component*/}Not found</>;

  return (
    <div className="flex w-fit flex-col gap-2">
      <img
        src={product.thumbnail ?? "/placeholder.svg"}
        className="size-20 rounded-md object-cover"
      />
      <Heading variant="h4">{product.title}</Heading>
      <Paragraph>{product.description}</Paragraph>
      <Heading variant="h4">
        <ProductPrice product={product} />
      </Heading>

      <ProductActions product={product} />
    </div>
  );
}
