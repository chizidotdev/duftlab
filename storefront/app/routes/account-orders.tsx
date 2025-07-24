import { Link, NavLink, redirect } from "react-router";

import { Undo } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading, Paragraph } from "@/components/ui/text";

import { CACHE_HEADERS } from "@/lib/constants";
import { listOrders } from "@/lib/data/orders";

import type { Route } from "./+types/account-orders";

export async function loader({ request }: Route.LoaderArgs) {
  const orders = await listOrders(request);

  if (!orders) {
    throw redirect("/account");
  }

  return { orders };
}

export function headers() {
  return CACHE_HEADERS;
}

export default function AccountOrders({ loaderData }: Route.ComponentProps) {
  const { orders } = loaderData;
  console.log(orders);

  return (
    <div className="mx-auto max-w-screen-xl space-y-10">
      <hgroup className="flex flex-wrap justify-between gap-6">
        <div className="max-w-lg">
          <Heading variant="h2">Orders</Heading>
          <Paragraph className="text-muted-foreground">
            View your previous orders and their status. You can also create returns or exchanges for
            your orders if needed.
          </Paragraph>
        </div>

        <NavLink to="/account" className="link">
          <Undo className="size-3.5" />
          Account Home
        </NavLink>
      </hgroup>

      {!orders.length && (
        <div className="flex w-full flex-col items-center gap-6 py-12">
          <div className="text-center">
            <Heading variant="h3">Your order history is empty</Heading>
            <Paragraph className="text-muted-foreground mt-2 max-w-lg">
              Once you place your first order, you'll be able to track its progress and view your
              order history here.
            </Paragraph>
          </div>
          <div>
            <Button asChild>
              <Link to="/collections/all">Start Shopping</Link>
            </Button>
          </div>
        </div>
      )}

      <section></section>
    </div>
  );
}
