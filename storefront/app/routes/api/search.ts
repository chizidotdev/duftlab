import { listProductsWithSort } from "@/lib/data/products";

import type { Route } from "./+types/search";

export async function action({ request }: Route.LoaderArgs) {
  const data = await request.json();

  const queryParams: {
    limit: number;
    q?: string;
    order?: string;
  } = {
    limit: 12,
    q: data.query,
  };

  const result = await listProductsWithSort(request, { queryParams });

  return Response.json(result.response);
}
