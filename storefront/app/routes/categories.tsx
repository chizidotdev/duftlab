import { Link, href, redirect, useNavigate } from "react-router";
import type { MetaFunction } from "react-router";

import { Button } from "@/components/ui/button";
import * as Pagination from "@/components/ui/pagination";
import * as Select from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Heading, Paragraph } from "@/components/ui/text";

import { CACHE_HEADERS, PRODUCT_LIMIT } from "@/lib/constants";
import { getCategoryByHandle } from "@/lib/data/categories";
import { listProductsWithSort } from "@/lib/data/products";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import {
  StructuredDataScript,
  createBreadcrumbSchema,
  createCollectionSchema,
} from "@/lib/utils/seo";
import type { SortOptions } from "@/lib/utils/sort-products";
import { ProductPreview } from "@/modules/products/product-preview";

import type { Route } from "./+types/categories";

export async function loader({ request, params }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const sortBy = (url.searchParams.get("sortBy") || "created_at") as SortOptions;
  const searchQuery = url.searchParams.get("q");
  const pageParam = url.searchParams.get("page");
  const page = !pageParam ? 1 : Number(pageParam);

  const category = await getCategoryByHandle([params.handle]);

  if (!category) {
    throw redirect(href("/collections/:handle", { handle: "all" }));
  }

  const queryParams: {
    limit: number;
    category_id: string[];
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

  const { response } = await listProductsWithSort(request, { page, queryParams, sortBy });

  return {
    url,
    productsResponse: response,
    page,
    query: searchQuery,
    sortBy,
    category,
  };
}

export function headers() {
  return CACHE_HEADERS;
}

export const meta: MetaFunction<typeof loader> = ({ params }) => {
  const title = `Shop ${params.handle} - Duftlab`;
  const description =
    "Browse our complete collection of authentic designer fragrances, niche perfumes, and luxury cologne by category.";

  return [{ title }, { name: "description", content: description }];
};

export default function Categories({ loaderData, params }: Route.ComponentProps) {
  const navigate = useNavigate();

  const { url, productsResponse, page, query, sortBy, category } = loaderData;
  const products = productsResponse?.products ?? [];

  const totalPages = productsResponse.count;
  const numOfPages = Math.ceil(totalPages / PRODUCT_LIMIT);

  function getPageLink(page: number) {
    url.searchParams.set("page", page.toString());
    return url.pathname + url.search;
  }

  function handleSort(value: SortOptions) {
    url.searchParams.set("sortBy", value);
    url.searchParams.delete("page");
    navigate(url.pathname + url.search);
  }

  return (
    <>
      <StructuredDataScript
        data={[
          createCollectionSchema(
            { title: category.name, handle: category.handle, description: category.description },
            products
          ),
          createBreadcrumbSchema([
            { name: "Home", url: siteConfig.url },
            { name: category.name, url: `${siteConfig.url}/categories/${params.handle}` },
          ]),
        ]}
      />
      <div className="space-y-10">
        <div className="space-y-3">
          <Heading className="capitalize" variant="h2">
            {!query ? `Shop ${category.name}` : `Search results for "${query}"`}
          </Heading>

          <Separator />

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
        </div>

        {!products.length ? (
          <div className="flex min-h-96 flex-col items-center justify-center space-y-4 rounded-lg text-center">
            <div className="mx-auto flex size-32">
              <img src="/assets/empty-state.svg" className="text-muted-foreground size-full" />
            </div>
            <div className="space-y-2">
              <Heading variant="h3">No products found</Heading>
              <Paragraph className="text-muted-foreground max-w-md">
                We couldn't find any products in this category. Try modifying your search or
                browsing other categories.
              </Paragraph>
            </div>
            <Button asChild>
              <Link to="/collections/all">Browse all products</Link>
            </Button>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductPreview key={product.id} product={product} />
            ))}
          </div>
        )}

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
