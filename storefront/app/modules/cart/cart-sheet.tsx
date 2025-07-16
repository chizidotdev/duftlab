import type { HttpTypes } from "@medusajs/types";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Paragraph } from "@/components/ui/text";

import { convertToLocale } from "@/lib/utils/money";

import { ProductThumbnail } from "../products/product-thumbnail";

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

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Cart</SheetTitle>
        <SheetDescription />
      </SheetHeader>

      <div className="flex h-full flex-col gap-10 px-6 pb-6">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-3">
              <ProductThumbnail className="w-1/4" product={item.product} />
              <div className="flex flex-col py-2">
                <Paragraph>{item.title}</Paragraph>
                <Paragraph className="text-muted-foreground">{item.variant?.title}</Paragraph>
                <div className="mt-auto flex gap-2">
                  <Paragraph>{item.quantity}x</Paragraph>
                  <Paragraph>
                    {convertToLocale({
                      amount: item.unit_price,
                      currency_code: cart.currency_code,
                    })}
                  </Paragraph>
                </div>
                <Paragraph>
                  {convertToLocale({ amount: item.total, currency_code: cart.currency_code })}
                </Paragraph>
              </div>
            </div>
          ))}
        </div>

        <Button className="mt-auto">Checkout</Button>
      </div>
    </SheetContent>
  );
}
