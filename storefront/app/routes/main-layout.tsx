import { Outlet, data, useNavigation } from "react-router";

import type { HttpTypes } from "@medusajs/types";

import { AppFooter } from "@/components/app-footer";
import { AppHeader } from "@/components/app-header";

import { getOrSetCart } from "@/lib/data/cart";

import type { Route } from "./+types/main-layout";

export async function loader({ request }: Route.LoaderArgs) {
  const headers = new Headers();
  const cart = await getOrSetCart(request, headers);
  // const customer = await retrieveCustomer(request);

  return data({ cart }, { headers });
}

export default function MainLayout({ loaderData }: Route.ComponentProps) {
  const { state } = useNavigation();
  const isNavigating = state === "loading";

  return (
    <div className="relative flex min-h-screen flex-col">
      {isNavigating && (
        <div className="bg-primary/20 fixed top-0 right-0 left-0 z-[999] h-1">
          <div className="bg-muted-foreground animate-progress-bar h-full"></div>
        </div>
      )}

      <AppHeader cart={loaderData.cart as HttpTypes.StoreCart} />
      <main className="container flex-1 pt-2">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
}
