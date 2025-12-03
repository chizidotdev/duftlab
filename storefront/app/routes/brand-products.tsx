import { redirect } from "react-router";

import * as Pagination from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { Heading, Paragraph } from "@/components/ui/text";

import { CACHE_HEADERS, PRODUCT_LIMIT } from "@/lib/constants";
import { getCategoryByHandle } from "@/lib/data/categories";
import { listProductsWithSort } from "@/lib/data/products";
import { cn } from "@/lib/utils";
import type { SortOptions } from "@/lib/utils/sort-products";
import { ProductPreview } from "@/modules/products/product-preview";

import type { Route } from "./+types/brand-products";

export async function loader({ request, params }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const sortBy = (url.searchParams.get("sortBy") || "created_at") as SortOptions;
  const searchQuery = url.searchParams.get("q");
  const pageParam = url.searchParams.get("page");
  const page = !pageParam ? 1 : Number(pageParam);

  const category = await getCategoryByHandle([params.handle]);
  if (!category) throw redirect("/brands");

  const queryParams: {
    limit: number;
    collection_id?: string[];
    category_id?: string[];
    id?: string[];
    order?: string;
    q?: string;
  } = {
    limit: PRODUCT_LIMIT,
    q: searchQuery || undefined,
    category_id: [category.id],
  };

  if (sortBy === "created_at") {
    queryParams["order"] = "created_at";
  }

  const products = await listProductsWithSort(request, { page, queryParams, sortBy });

  return {
    url,
    page,
    query: searchQuery,
    sortBy,
    productsResponse: products.response,
    category,
  };
}

export function headers() {
  return CACHE_HEADERS;
}

export function meta({ data }: Route.MetaArgs) {
  const description =
    "Browse our complete collection of authentic designer fragrances, niche perfumes, and luxury cologne from top brands.";

  return [
    { title: `Shop ${data.category.name} brands - Duftlab` },
    { name: "description", content: description },
  ];
}

export default function CategoryProducts({ loaderData }: Route.ComponentProps) {
  const { page, url, category, productsResponse } = loaderData;
  const products = productsResponse.products;

  const totalPages = productsResponse.count;
  const numOfPages = Math.ceil(totalPages / PRODUCT_LIMIT);

  function getPageLink(page: number) {
    url.searchParams.set("page", page.toString());
    return url.pathname + url.search;
  }

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
            Shop {category.name}
          </Heading>
          <Paragraph className="text-muted-foreground max-w-prose">
            {category.description}
          </Paragraph>

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

        <div className="products-grid">
          {products.map((product) => (
            <ProductPreview key={product.id} product={product} />
          ))}
        </div>

        <Pagination.Pagination className={cn("mt-6", numOfPages <= 1 && "hidden")}>
          <Pagination.PaginationContent>
            <Pagination.PaginationItem>
              <Pagination.PaginationPrevious
                to={getPageLink(page === 1 ? page : page - 1)}
                aria-disabled={page === 1 ? true : undefined}
              />
            </Pagination.PaginationItem>
            {Array.from({ length: numOfPages }).map((_, i) => (
              <Pagination.PaginationItem key={i}>
                <Pagination.PaginationLink isActive={i + 1 === page} to={getPageLink(i + 1)}>
                  {i + 1}
                </Pagination.PaginationLink>
              </Pagination.PaginationItem>
            ))}
            <Pagination.PaginationItem>
              <Pagination.PaginationNext
                to={getPageLink(page === numOfPages ? page : page + 1)}
                aria-disabled={page === numOfPages ? true : undefined}
              />
            </Pagination.PaginationItem>
          </Pagination.PaginationContent>
        </Pagination.Pagination>
      </div>
    </>
  );
}
