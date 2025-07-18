import { data } from "react-router";

import { addToCart, deleteLineItem, getOrSetCart, updateLineItem } from "@/lib/data/cart";

import type { Route } from "./+types/cart";

export async function loader({ request }: Route.LoaderArgs) {
  const headers = new Headers();
  const cart = await getOrSetCart(request, headers);

  return data(cart, { headers });
}

export async function action(args: Route.ActionArgs) {
  const { request } = args;

  switch (request.method) {
    case "POST":
      return postRoute(args);

    case "DELETE":
      return deleteRoute(args);

    case "PATCH":
      return patchRoute(args);

    default:
      return Response.json({ error: "Method not allowed" }, { status: 405 });
  }
}

async function postRoute({ request }: Route.ActionArgs) {
  const data = await request.json();

  const headers = new Headers();
  await addToCart(request, {
    variantId: data.variantId,
    quantity: data.quantity,
    responseHeaders: headers,
  });

  return Response.json({ message: "Success" }, { headers });
}

async function deleteRoute({ request }: Route.ActionArgs) {
  const data = await request.json();
  await deleteLineItem(request, data.lineId);

  return Response.json({ message: "Success" });
}

async function patchRoute({ request }: Route.ActionArgs) {
  const data = await request.json();
  await updateLineItem(request, { lineId: data.lineId, quantity: data.quantity });

  return Response.json({ message: "Success" });
}
