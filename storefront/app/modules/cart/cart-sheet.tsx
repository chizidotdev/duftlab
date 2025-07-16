import type { HttpTypes } from "@medusajs/types";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Heading, Paragraph } from "@/components/ui/text";

import { convertToLocale } from "@/lib/utils/money";

import { ProductThumbnail } from "../products/product-thumbnail";
import { QuantitySelect } from "./quantity-select";

export function CartSheet({ cart }: { cart: HttpTypes.StoreCart | null }) {
  return (
    <Sheet>
      <SheetTrigger className="text-sm uppercase">
        Cart
        <CartCount cart={cart} />
      </SheetTrigger>

      <CartContent cart={cart} />
    </Sheet>
  );
}

function CartCount({ cart }: { cart: HttpTypes.StoreCart | null }) {
  const itemsLength = cart?.items?.length;
  if (!itemsLength) return;

  return <span>&nbsp;({itemsLength})</span>;
}

function CartContent({ cart }: { cart: HttpTypes.StoreCart | null }) {
  if (!cart) return null;
  const cartItems = cart.items ?? [];

  function onQuantityChange(qty: number) {
    console.log(qty);
  }

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Cart</SheetTitle>
        <SheetDescription />
      </SheetHeader>

      <div className="flex h-full flex-col gap-6 px-6 pb-6">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-3">
              <ProductThumbnail className="w-1/4" product={item.product} />

              <div className="flex flex-1 flex-col py-2">
                <Paragraph>{item.title}</Paragraph>
                <Paragraph className="text-muted-foreground">{item.variant?.title}</Paragraph>

                <div className="mt-auto flex items-center justify-between gap-2">
                  <QuantitySelect quantity={item.quantity} onChange={onQuantityChange} />
                  <Paragraph>
                    {convertToLocale({ amount: item.total, currency_code: cart.currency_code })}
                  </Paragraph>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        <div className="flex items-center justify-between gap-4">
          <Heading variant="h3">Subtotal</Heading>
          <Heading variant="h3">
            {convertToLocale({ amount: cart.subtotal, currency_code: cart.currency_code })}
          </Heading>
        </div>
      </div>

      <SheetFooter>
        <Button>Checkout</Button>
      </SheetFooter>
    </SheetContent>
  );
}
