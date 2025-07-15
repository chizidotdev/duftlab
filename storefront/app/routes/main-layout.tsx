import { Outlet, useNavigation } from "react-router";

import type { HttpTypes } from "@medusajs/types";

import { AppHeader } from "@/components/app-header";

import { retrieveCart } from "@/lib/data/cart";

import type { Route } from "./+types/main-layout";

export function loader({ request }: Route.LoaderArgs) {
  const cart = retrieveCart(request);
  // const customer = await retrieveCustomer(request);

  return { cart };
}

export default function MainLayout({ loaderData }: Route.ComponentProps) {
  const { state } = useNavigation();
  const isNavigating = state === "loading";
  const cart = loaderData.cart as Promise<HttpTypes.StoreCart | null>;

  return (
    <div className="container">
      {isNavigating && (
        <div className="bg-background/60 fixed inset-0 z-50 h-dvh cursor-progress" />
      )}

      <AppHeader cart={cart} />
      <Outlet />
    </div>
  );
}
