import { Suspense } from "react";
import { Await, NavLink } from "react-router";

import type { HttpTypes } from "@medusajs/types";

export function CartButton({ cart }: { cart: Promise<HttpTypes.StoreCart | null> }) {
  return (
    <NavLink to="/cart" className="text-xs uppercase">
      Cart
      <Suspense fallback={null}>
        <Await resolve={cart}>{(value) => <CartCount cart={value as HttpTypes.StoreCart} />}</Await>
      </Suspense>
    </NavLink>
  );
}

function CartCount({ cart }: { cart: HttpTypes.StoreCart | null }) {
  const itemsLength = cart?.items?.length;
  if (!itemsLength) return;

  return <span>&nbsp;({itemsLength})</span>;
}
