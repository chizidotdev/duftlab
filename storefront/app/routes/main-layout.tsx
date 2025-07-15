import { Suspense } from "react";
import { Await, Link, NavLink, Outlet, useNavigation } from "react-router";

import type { HttpTypes } from "@medusajs/types";
import { ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";

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
  const { cart } = loaderData;

  return (
    <div className="container py-10">
      {isNavigating && (
        <div className="bg-background/60 fixed inset-0 z-50 h-dvh cursor-progress" />
      )}

      <header className="flex justify-between">
        <NavLink to="/">Home</NavLink>

        <Button asChild className="relative" variant="secondary" size="icon">
          <Link to="/cart">
            <ShoppingBag />
            <Suspense fallback={null}>
              <Await resolve={cart}>
                {(value) => <CartCount cart={value as HttpTypes.StoreCart} />}
              </Await>
            </Suspense>
          </Link>
        </Button>
      </header>
      <Outlet />
    </div>
  );
}

function CartCount({ cart }: { cart: HttpTypes.StoreCart | null }) {
  const itemsLength = cart?.items?.length;
  if (!itemsLength) return;

  return (
    <div className="bg-primary text-primary-foreground pointer-events-none absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full">
      <span className="text-xs">{itemsLength}</span>
    </div>
  );
}
