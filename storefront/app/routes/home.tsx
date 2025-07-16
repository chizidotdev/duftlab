import { Link } from "react-router";

import { Heading } from "@/components/ui/text";

import { CACHE_HEADERS } from "@/lib/constants";
import { listProductsWithSort } from "@/lib/data/products";
import { ProductPrice } from "@/modules/products/product-price";

import type { Route } from "./+types/home";

export async function loader({ request }: Route.LoaderArgs) {
  return await listProductsWithSort(request);
}

export function headers() {
  return CACHE_HEADERS;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { response } = loaderData;
  const products = response?.products;

  return <></>;
}
