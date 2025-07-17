import type { HttpTypes } from "@medusajs/types";
import { XIcon } from "lucide-react";

import { Paragraph } from "@/components/ui/text";

import { useRemoveCartItem } from "@/hooks/data";
import { cn } from "@/lib/utils";
import { convertToLocale } from "@/lib/utils/money";
import { ProductThumbnail } from "@/modules/products/product-thumbnail";

import { QuantitySelect } from "./quantity-select";

export function CartItem({
  cart,
  item,
}: {
  cart: HttpTypes.StoreCart;
  item: HttpTypes.StoreCartLineItem;
}) {
  const { mutate, isPending } = useRemoveCartItem();

  function onQuantityChange(qty: number) {
    console.log(qty);
  }

  function onRemove() {
    mutate({ lineId: item.id });
  }

  return (
    <div
      className={cn("flex gap-3", isPending && "pointer-events-none cursor-progress opacity-80")}
    >
      <div className="relative w-1/4">
        <button
          onClick={onRemove}
          className="bg-muted absolute -top-2 -left-2 z-10 rounded-full p-2"
        >
          <XIcon className="size-3.5" />
        </button>
        <ProductThumbnail product={item.product} />
      </div>

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
  );
}
