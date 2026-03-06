import { Link, href } from "react-router";

import type { HttpTypes } from "@medusajs/types";

import { Heading, Paragraph } from "@/components/ui/text";

import { CACHE_HEADERS } from "@/lib/constants";
import { listProducts } from "@/lib/data/products";
import { siteConfig } from "@/lib/site-config";
import { StructuredDataScript, createBreadcrumbSchema, createProductSchema } from "@/lib/utils/seo";
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
  const description =
    product.description ||
    `Shop ${product.title} authentic fragrance at Duftlab. Premium quality with fast shipping across Nigeria.`;

  return [
    { title: `${product.title} - Duftlab` },
    { name: "description", content: description },
    { property: "og:type", content: "product" },
    { property: "og:image", content: product.thumbnail || siteConfig.ogImage },
  ];
}

export function headers() {
  return CACHE_HEADERS;
}

export default function ProductDetails({ loaderData, params }: Route.ComponentProps) {
  const { product } = loaderData;

  return (
    <>
      {product && (
        <StructuredDataScript
          data={[
            createProductSchema(product, `${siteConfig.url}/products/${params.handle}`),
            createBreadcrumbSchema([
              { name: "Home", url: siteConfig.url },
              { name: "Shop", url: `${siteConfig.url}/collections/all` },
              { name: product.title, url: `${siteConfig.url}/products/${params.handle}` },
            ]),
          ]}
        />
      )}
      <div className="space-y-6">
        <ProductInfo product={product} />
      </div>
    </>
  );
}

function ProductInfo({ product }: { product: HttpTypes.StoreProduct }) {
  if (!product) return <>{/*404 product component*/}Not found</>;

  return (
    <div className="relative flex flex-col gap-10 lg:flex-row">
      <ul className="flex-1 space-y-4">
        <li className="bg-muted overflow-hidden rounded-sm lg:h-[calc(100dvh-9rem)]">
          <img
            src={product?.thumbnail ?? "/placeholder.svg"}
            alt={`${product.title} fragrance main image`}
            className="size-full object-contain transition-opacity"
          />
        </li>
        {!!product.images?.[1] && (
          <li className="bg-muted hidden overflow-hidden rounded-sm lg:block lg:h-[calc(100dvh-10rem)]">
            <img
              src={product.images[1].url}
              alt={`${product.title} fragrance alternate view`}
              className="size-full object-contain transition-opacity"
            />
          </li>
        )}
        {!!product.images?.[2] && (
          <li className="bg-muted hidden overflow-hidden rounded-sm lg:block lg:h-[calc(100dvh-10rem)]">
            <img
              src={product.images[2].url}
              alt={`${product.title} fragrance additional view`}
              className="size-full object-contain transition-opacity"
            />
          </li>
        )}
      </ul>

      <div className="sticky top-32 flex w-full flex-col justify-center gap-8 lg:h-[calc(100dvh-9rem)] lg:max-w-md 2xl:max-w-lg">
        <div>
          <Paragraph className="text-muted-foreground flex flex-wrap gap-1.5">
            {product.categories?.map((c, index) => (
              <Link className="link" to={href("/categories/:handle", { handle: c.handle })}>
                {c.name}
                {index < (product.categories?.length ?? 0) - 1 && ","}
              </Link>
            ))}
            {!!product.tags?.length && (
              <>
                -
                {product.tags.map((t, index) => (
                  <Link
                    className="link"
                    to={href("/collections/:handle", { handle: "all" }) + `?q=${t.value}`}
                  >
                    {t.value}
                    {index < (product.tags?.length ?? 0) - 1 && ","}
                  </Link>
                ))}
              </>
            )}
          </Paragraph>
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
