import type { HttpTypes } from "@medusajs/types";

import { Heading, Paragraph } from "@/components/ui/text";

import { CACHE_HEADERS } from "@/lib/constants";
import { listProducts } from "@/lib/data/products";
import { ProductActions } from "@/modules/products/product-actions";

import type { Route } from "./+types/product-details";

export async function loader({ request, params }: Route.LoaderArgs) {
  const product = await listProducts(request, {
    queryParams: { handle: params.handle },
  }).then(({ response }) => response.products[0]);

  return { product };
}

export function meta({ data }: Route.MetaArgs): Route.MetaDescriptors {
  return [
    { title: data.product.title },
    { name: "description", content: data.product.description },
    { name: "og:image", content: data.product.thumbnail },
  ];
}

export function headers() {
  return CACHE_HEADERS;
}

export default function ProductDetails({ loaderData }: Route.ComponentProps) {
  const { product } = loaderData;

  return (
    <div className="space-y-6">
      <ProductInfo product={product} />
    </div>
  );
}

function ProductInfo({ product }: { product: HttpTypes.StoreProduct }) {
  if (!product) return <>{/*404 product component*/}Not found</>;

  return (
    <div className="flex flex-col gap-10 lg:flex-row">
      <div className="bg-muted relative h-[calc(100dvh-6rem)] flex-1 rounded-md">
        <img
          src={product?.thumbnail ?? "/placeholder.svg"}
          className="size-full rounded-md object-cover transition-opacity"
        />
      </div>

      <div className="flex flex-col justify-center gap-2 lg:w-1/3 lg:max-w-md">
        <Heading variant="h3">{product.title}</Heading>
        <Paragraph>{product.description}</Paragraph>

        <ProductActions product={product} />
      </div>
    </div>
  );
}
