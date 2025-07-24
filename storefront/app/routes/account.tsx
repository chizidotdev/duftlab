import { data } from "react-router";

import { retrieveCustomer } from "@/lib/data/customer";

import type { Route } from "./+types/account";

export async function loader({ request }: Route.LoaderArgs) {
  const customer = await retrieveCustomer(request);
  
  if (!customer) {
    throw new Response("Unauthorized", { status: 401 });
  }

  return data({ customer });
}

export default function Account({ loaderData }: Route.ComponentProps) {
  const { customer } = loaderData;

  return (
    <div className="container max-w-2xl py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">My Account</h1>
          <p className="text-muted-foreground">
            Manage your account information and view your order history.
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">Account Information</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Name:</span> {customer.first_name} {customer.last_name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {customer.email}
            </p>
            {customer.phone && (
              <p>
                <span className="font-medium">Phone:</span> {customer.phone}
              </p>
            )}
          </div>
        </div>

        {customer.orders && customer.orders.length > 0 && (
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-lg font-semibold">Recent Orders</h2>
            <div className="space-y-4">
              {customer.orders.slice(0, 5).map((order: any) => (
                <div key={order.id} className="flex justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Order #{order.display_id}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(order.total / 100).toFixed(2)}</p>
                    <p className="text-sm capitalize text-muted-foreground">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}