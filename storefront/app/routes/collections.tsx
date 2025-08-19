import { NavLink, redirect } from "react-router";
import type { MetaFunction } from "react-router";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/text";

import { CACHE_HEADERS } from "@/lib/constants";
import { getCollectionByHandle, listCollections } from "@/lib/data/collections";
import { listProductsWithSort } from "@/lib/data/products";
import { cn } from "@/lib/utils";
import { ProductPreview } from "@/modules/products/product-preview";

import type { Route } from "./+types/collections";

const PRODUCT_LIMIT = 20;

export async function loader({ request, params }: Route.LoaderArgs) {
  const searchParams = new URL(request.url).searchParams;
  const pageParam = searchParams.get("page");
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
  } = {
    limit: PRODUCT_LIMIT,
  };

  if (collection?.id) {
    queryParams["collection_id"] = [collection.id];
  }

  const [{ response }, collectionsResponse] = await Promise.all([
    listProductsWithSort(request, { page, queryParams }),
    listCollections(),
  ]);
  return { productsResponse: response, collectionsResponse, page };
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
  const { productsResponse, collectionsResponse, page } = loaderData;
  const products = productsResponse?.products ?? [];
  const collections = collectionsResponse?.collections ?? [];

  const totalPages = productsResponse.count;
  const numOfPages = Math.ceil(totalPages / PRODUCT_LIMIT);

  // const showLeftEllipsis = page - 1 > paginationItemsToDisplay / 2;
  // const showRightEllipsis = totalPages - page + 1 > paginationItemsToDisplay / 2;

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <Heading className="capitalize" variant="h2">
          Shop {params.handle}
        </Heading>

        <Separator />

        <nav className="flex items-center gap-6">
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
      </div>

      <div className="grid grid-cols-2 gap-x-1 gap-y-6 md:grid-cols-[repeat(auto-fill,minmax(16rem,auto))] 2xl:grid-cols-5">
        {products.map((product) => (
          <ProductPreview key={product.id} product={product} />
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              to={page === 1 ? `?page=${page}` : `?page=${page - 1}`}
              aria-disabled={page === 1 ? true : undefined}
            />
          </PaginationItem>
          {Array.from({ length: numOfPages }).map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink isActive={i + 1 === page} to={`?page=${i + 1}`}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              to={page === numOfPages ? `?page=${page}` : `?page=${page + 1}`}
              aria-disabled={page === numOfPages ? true : undefined}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
