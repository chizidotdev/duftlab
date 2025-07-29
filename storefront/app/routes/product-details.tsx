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
  if (!data?.product) {
    return [
      { title: "Product Not Found - Duftlab" },
      { name: "description", content: "The fragrance you're looking for could not be found." },
    ];
  }

  const { product } = data;
  return [
    { title: `${product.title} - Duftlab` },
    {
      name: "description",
      content:
        product.description ||
        `Shop ${product.title} authentic fragrance at Duftlab. Premium quality with fast shipping across Nigeria.`,
    },
    { name: "og:image", content: product.thumbnail },
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
      <div className="bg-muted relative flex h-[calc(100dvh-10rem)] flex-1 flex-col items-center justify-center overflow-hidden rounded-sm">
        <img
          src={product?.thumbnail ?? "/placeholder.svg"}
          className="size-full object-contain transition-opacity"
        />
      </div>

      <div className="flex flex-col justify-center gap-4 lg:max-w-md 2xl:max-w-lg">
        <div>
          <Paragraph className="text-muted-foreground">{product.collection?.title}</Paragraph>
          <Heading variant="h3">{product.title}</Heading>
        </div>

        <ProductActions product={product} />

        <div className="">
          <Paragraph className="whitespace-pre-wrap">{product.description}</Paragraph>
        </div>
      </div>
    </div>
  );
}
