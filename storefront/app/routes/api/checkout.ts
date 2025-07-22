import { setAddresses, setShippingMethod } from "@/lib/data/cart";

import type { Route } from "./+types/checkout";

export async function action(args: Route.ActionArgs) {
  const { request } = args;

  switch (request.method) {
    case "POST":
      return postRoute(args);

    case "PATCH":
      return patchRoute(args);

    default:
      return Response.json({ error: "Method not allowed" }, { status: 405 });
  }
}

async function postRoute({ request }: Route.ActionArgs) {
  const data = await request.json();

  await setAddresses(request, data);

  return Response.json({ message: "Success" });
}

async function patchRoute({ request }: Route.ActionArgs) {
  const data = await request.json();
  await setShippingMethod(request, { shippingMethodId: data.shippingMethodId });

  return Response.json({ message: "Success" });
}
