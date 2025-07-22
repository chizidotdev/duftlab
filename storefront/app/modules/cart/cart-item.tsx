import type { HttpTypes } from "@medusajs/types";
import { XIcon } from "lucide-react";

import { Paragraph } from "@/components/ui/text";

import { useRemoveCartItem, useUpdateCartItem } from "@/hooks/data";
import { cn } from "@/lib/utils";
import { convertToLocale } from "@/lib/utils/money";

import { QuantitySelect } from "./quantity-select";

export function CartItem({
  cart,
  item,
}: {
  cart: HttpTypes.StoreCart;
  item: HttpTypes.StoreCartLineItem;
}) {
  const { mutate: removeItem, isPending: isRemoving } = useRemoveCartItem();
  const { mutate: updateItem, isPending: isUpdating } = useUpdateCartItem();
  const isLoading = isRemoving || isUpdating;

  function onQuantityChange(quantity: number) {
    if (quantity < 1) return;
    // const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory;

    updateItem({ lineId: item.id, quantity });
  }

  function onRemove() {
    removeItem({ lineId: item.id });
  }

  return (
    <div
      className={cn("flex gap-3", isLoading && "pointer-events-none animate-pulse cursor-progress")}
    >
      <div className="relative w-1/3 sm:w-1/4">
        <button
          onClick={onRemove}
          className="bg-muted absolute -top-2 -left-2 z-10 rounded-full p-2"
        >
          <XIcon className="size-3.5" />
        </button>
        <div className="bg-muted rounded">
          <img
            src={item?.thumbnail ?? "/placeholder.svg"}
            className="size-full rounded-md object-cover transition-opacity"
          />
        </div>
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
