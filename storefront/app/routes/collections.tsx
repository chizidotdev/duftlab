import { Link, NavLink, redirect, useNavigate } from "react-router";
import type { MetaFunction } from "react-router";

import { Button } from "@/components/ui/button";
import * as Pagination from "@/components/ui/pagination";
import * as Select from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Heading, Paragraph } from "@/components/ui/text";

import { CACHE_HEADERS, PRODUCT_LIMIT } from "@/lib/constants";
import { getCollectionByHandle, listCollections } from "@/lib/data/collections";
import { listProductsWithSort } from "@/lib/data/products";
import { cn } from "@/lib/utils";
import type { SortOptions } from "@/lib/utils/sort-products";
import { ProductPreview } from "@/modules/products/product-preview";

import type { Route } from "./+types/collections";

export async function loader({ request, params }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const sortBy = (url.searchParams.get("sortBy") || "created_at") as SortOptions;
  const searchQuery = url.searchParams.get("q");
  const pageParam = url.searchParams.get("page");
  const page = !pageParam ? 1 : Number(pageParam);

  const collection = await getCollectionByHandle(params.handle);

  if (!collection && params.handle !== "all") {
    throw redirect("/collections/all");
  }

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
  };

  if (collection?.id) {
    queryParams["collection_id"] = [collection.id];
  }

  if (sortBy === "created_at") {
    queryParams["order"] = "created_at";
  }

  const [{ response }, collectionsResponse] = await Promise.all([
    listProductsWithSort(request, { page, queryParams, sortBy }),
    listCollections(),
  ]);

  return { url, productsResponse: response, collectionsResponse, page, query: searchQuery, sortBy };
}

export function headers() {
  return CACHE_HEADERS;
}

export const meta: MetaFunction = ({ params }) => {
  const title = params.handle
    ? `Shop ${params.handle} collection - Duftlab`
    : "Shop All Fragrances - Duftlab";

  return [
    { title },
    {
      name: "description",
      content:
        "Browse our complete collection of authentic designer fragrances, niche perfumes, and luxury cologne from top brands.",
    },
  ];
};

export default function Collections({ loaderData, params }: Route.ComponentProps) {
  const navigate = useNavigate();

  const { url, productsResponse, collectionsResponse, page, query, sortBy } = loaderData;
  const products = productsResponse?.products ?? [];
  const collections = collectionsResponse?.collections ?? [];

  const totalPages = productsResponse.count;
  const numOfPages = Math.ceil(totalPages / PRODUCT_LIMIT);

  function getPageLink(page: number) {
    url.searchParams.set("page", page.toString());
    return url.pathname + url.search;
  }

  function handleSort(value: SortOptions) {
    url.searchParams.set("sortBy", value);
    url.searchParams.delete("page"); // Reset to first page on sort change
    navigate(url.pathname + url.search);
  }

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <Heading className="capitalize" variant="h2">
          {!query ? `Shop ${params.handle}` : `Search results for "${query}"`}
        </Heading>

        <Separator />

        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4">
          <nav className="flex items-center gap-6 overflow-x-auto">
            <NavLink
              className={({ isActive }) => cn("link", isActive && "text-foreground")}
              to={`/collections/all`}
            >
              Shop all
            </NavLink>
            {collections.map((collection) => (
              <NavLink
                key={collection.id}
                className={({ isActive }) => cn("link", isActive && "text-foreground")}
                to={`/collections/${collection.handle}`}
              >
                {collection.title}
              </NavLink>
            ))}
          </nav>

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
      </div>

      {!products.length ? (
        <div className="flex min-h-96 flex-col items-center justify-center space-y-4 rounded-lg text-center">
          <div className="mx-auto flex size-32">
            <img src="/assets/empty-state.svg" className="text-muted-foreground size-full" />
          </div>
          <div className="space-y-2">
            <Heading variant="h3">No products found</Heading>
            <Paragraph className="text-muted-foreground max-w-md">
              We couldn't find any products in this collection. Try modifying your search or
              browsing other collections.
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
  );
}
