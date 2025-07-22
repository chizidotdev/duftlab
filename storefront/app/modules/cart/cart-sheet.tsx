import { Link } from "react-router";

import type { HttpTypes } from "@medusajs/types";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Heading } from "@/components/ui/text";

import { useGetCart } from "@/hooks/data";
import { convertToLocale } from "@/lib/utils/money";

import { PaymentProviders } from "../checkout/payment-providers";
import { CartItem } from "./cart-item";

export function CartSheet({
  cart,
  children,
}: {
  cart: HttpTypes.StoreCart | null;
  children: React.ReactNode;
}) {
  const { data } = useGetCart(cart);

  return (
    <Sheet>
      <SheetTrigger className="inline-flex items-center text-sm uppercase">
        {children}
        <CartCount cart={data} />
      </SheetTrigger>

      <CartContent cart={data} />
    </Sheet>
  );
}

function CartCount({ cart }: { cart: HttpTypes.StoreCart | null }) {
  const itemsLength = cart?.items?.length;
  if (!itemsLength) return;

  return <span className="text-xs">&nbsp;({itemsLength})</span>;
}

function CartContent({ cart }: { cart: HttpTypes.StoreCart | null }) {
  if (!cart) return null;
  const cartItems = cart.items ?? [];
  const isEmpty = !cartItems.length;

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>{isEmpty ? "Your cart is empty" : "Cart"}</SheetTitle>
        <SheetDescription />
      </SheetHeader>

      {isEmpty ? (
        <div className="flex h-1/2 flex-col justify-end p-6">
          <Heading>Not sure where to start?</Heading>
          <SheetClose asChild>
            <Link to="/collections/popular">Shop popular</Link>
          </SheetClose>
        </div>
      ) : (
        <>
          <div className="flex h-full flex-col gap-6 px-6 pb-6">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem key={item.id} cart={cart} item={item} />
              ))}
            </div>

            <Separator />

            <div className="flex items-center justify-between gap-4">
              <Heading variant="h3">Subtotal</Heading>
              <Heading variant="h3">
                {convertToLocale({ amount: cart.item_subtotal, currency_code: cart.currency_code })}
              </Heading>
            </div>
          </div>

          <SheetFooter>
            <SheetClose asChild>
              <Button asChild>
                <Link to="/checkout">Checkout</Link>
              </Button>
            </SheetClose>
            <PaymentProviders />
          </SheetFooter>
        </>
      )}
    </SheetContent>
  );
}
