import { Link, type MetaFunction, href } from "react-router";

import { SquareArrowOutUpRight } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Heading, Paragraph } from "@/components/ui/text";

import { CACHE_HEADERS } from "@/lib/constants";
import { listCategories } from "@/lib/data/categories";
import { listProductsWithSort } from "@/lib/data/products";
import type { SortOptions } from "@/lib/utils/sort-products";
import { ProductPreview } from "@/modules/products/product-preview";

import type { Route } from "./+types/brands";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const sortBy = (url.searchParams.get("sortBy") || "created_at") as SortOptions;
  const searchQuery = url.searchParams.get("q");
  const pageParam = url.searchParams.get("page");
  const page = !pageParam ? 1 : Number(pageParam);

  const queryParams: {
    limit: number;
    collection_id?: string[];
    category_id?: string[];
    id?: string[];
    order?: string;
    q?: string;
  } = {
    limit: 4,
    q: searchQuery || undefined,
  };

  if (sortBy === "created_at") {
    queryParams["order"] = "created_at";
  }

  const categories = await listCategories();

  const results = await Promise.all(
    categories.map((cat) => {
      queryParams["category_id"] = [cat.id];
      return listProductsWithSort(request, { page, queryParams, sortBy });
    })
  );

  const categoriesWithProducts = results.map((res, index) => ({
    ...categories[index],
    productsResponse: res.response.products,
  }));

  return {
    url,
    page,
    query: searchQuery,
    sortBy,
    categoriesWithProducts,
  };
}

export function headers() {
  return CACHE_HEADERS;
}

export const meta: MetaFunction = () => {
  const description =
    "Browse our complete collection of authentic designer fragrances, niche perfumes, and luxury cologne from top brands.";

  return [{ title: "Shop brands - Duftlab" }, { name: "description", content: description }];
};

export default function Categories({ loaderData }: Route.ComponentProps) {
  const { categoriesWithProducts } = loaderData;

  return (
    <>
      {/* <StructuredDataScript
        data={[
          createCollectionSchema(collectionData, products),
          createBreadcrumbSchema([
            { name: "Home", url: siteConfig.url },
            { name: collectionData.title, url: `${siteConfig.url}/collections/${params.handle}` },
          ]),
        ]}
      /> */}
      <div className="space-y-10">
        <div className="space-y-3">
          <Heading className="capitalize" variant="h2">
            Shop brands
          </Heading>

          <Separator />

          {/* <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4">
            <Select.Select defaultValue={sortBy} onValueChange={handleSort}>
              <Select.SelectTrigger className="w-fit">
                <Select.SelectValue placeholder="Sort by" />
              </Select.SelectTrigger>
              <Select.SelectContent collisionPadding={24}>
                <Select.SelectItem value="created_at">Latest</Select.SelectItem>
                <Select.SelectItem value="price_asc">Price: Low to High</Select.SelectItem>
                <Select.SelectItem value="price_desc">Price: High to Low</Select.SelectItem>
              </Select.SelectContent>
            </Select.Select>
          </div> */}
        </div>

        <div className="space-y-16">
          {categoriesWithProducts.map(
            (category) =>
              !!category.productsResponse?.length && (
                <div className="grid gap-6 lg:grid-cols-[28rem_1fr]" key={category.id}>
                  <hgroup>
                    <Heading variant="h3">{category.name}</Heading>
                    <Paragraph className="text-muted-foreground">{category.description}</Paragraph>
                    <Link
                      to={href("/brands/:handle", { handle: category.handle })}
                      className="link mt-4"
                    >
                      <SquareArrowOutUpRight className="size-3.5" />
                      View all
                    </Link>
                  </hgroup>

                  <div className="products-grid">
                    {category.productsResponse.map((product) => (
                      <ProductPreview key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
}
