import { Link, NavLink, redirect } from "react-router";
import type { MetaFunction } from "react-router";

import { Undo } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heading, Paragraph } from "@/components/ui/text";

import { CACHE_HEADERS } from "@/lib/constants";
import { listOrders } from "@/lib/data/orders";
import { formatDate } from "@/lib/utils/date";
import { convertToLocale } from "@/lib/utils/money";

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

export const meta: MetaFunction = () => {
  return [
    { title: "Order History - Duftlab" },
    {
      name: "description",
      content: "View your duftlab orders, track delivery status, and manage returns or exchanges.",
    },
  ];
};

export default function AccountOrders({ loaderData }: Route.ComponentProps) {
  const { orders } = loaderData;

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

      {!orders.length ? (
        <div className="flex w-full flex-col items-center gap-6 py-12">
          <div className="text-center">
            <Heading variant="h3">Your order history is empty</Heading>
            <Paragraph className="text-muted-foreground mt-2 max-w-lg">
              Once you place your first order, you'll be able to track its progress and view your
              order history here.
            </Paragraph>
          </div>
          <Button asChild>
            <Link to="/collections/all">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <section className="grid gap-4 md:grid-cols-2">
          {orders.map((order) => (
            <div key={order.id} className="bg-card flex flex-col gap-4 rounded-sm border p-5">
              <div className="flex items-center justify-between">
                <div>
                  <Heading variant="h4">#{order.display_id}</Heading>
                  <Paragraph className="text-muted-foreground text-sm">
                    {formatDate(order.created_at)}
                  </Paragraph>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={order.payment_status === "captured" ? "success" : "secondary"}>
                    {order.payment_status === "captured" ? "Paid" : order.payment_status}
                  </Badge>
                  <Badge
                    variant={order.fulfillment_status === "fulfilled" ? "success" : "secondary"}
                  >
                    {order.fulfillment_status === "not_fulfilled"
                      ? "Processing"
                      : order.fulfillment_status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                {order.items?.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="bg-muted size-20 flex-shrink-0 overflow-hidden rounded-sm">
                      {item.thumbnail && (
                        <img
                          src={item.thumbnail}
                          alt={`${item.title} fragrance product image`}
                          className="size-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <Heading variant="h4" className="truncate">
                            {item.title}
                          </Heading>
                          <Paragraph className="text-muted-foreground text-sm">
                            Qty: {item.quantity}
                          </Paragraph>
                        </div>
                        <div className="text-right">
                          <Paragraph>
                            {convertToLocale({
                              amount: item.total,
                              currency_code: order.currency_code,
                            })}
                          </Paragraph>
                          {!!item.discount_total && (
                            <Paragraph className="text-muted-foreground text-xs line-through">
                              {convertToLocale({
                                amount: item.original_total,
                                currency_code: order.currency_code,
                              })}
                            </Paragraph>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between border-t pt-4">
                <Paragraph className="text-muted-foreground text-sm">
                  {order.items?.length} item{order.items?.length !== 1 ? "s" : ""}
                </Paragraph>
                <Heading variant="h4">
                  Total:{" "}
                  {convertToLocale({ amount: order.total, currency_code: order.currency_code })}
                </Heading>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
