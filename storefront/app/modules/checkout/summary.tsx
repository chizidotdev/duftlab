import type { HttpTypes } from "@medusajs/types";

import { Separator } from "@/components/ui/separator";
import { Heading, Paragraph } from "@/components/ui/text";

import { cn } from "@/lib/utils";
import { convertToLocale } from "@/lib/utils/money";

export function Summary({ cart }: { cart: HttpTypes.StoreCart | null }) {
  if (!cart) return null;
  const cartItems = cart.items ?? [];

  const summaryData = [
    { title: "Subtotal", value: cart.item_subtotal },
    { title: "Shipping", value: cart.shipping_total },
    { title: "Discount", value: cart.discount_total, alt: true },
  ];

  return (
    <div className="mx-auto w-full max-w-sm space-y-6 py-8 lg:ml-0">
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div className="flex gap-3">
            <div className="relative w-1/6">
              <div className="bg-muted-foreground text-primary-foreground absolute -top-2 -right-2 z-10 grid size-6 place-content-center rounded-full border text-xs">
                {item.quantity}
              </div>
              <div className="bg-muted-foreground/5 rounded-sm border">
                <img
                  src={item?.thumbnail ?? "/placeholder.svg"}
                  className="size-full object-cover transition-opacity"
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col py-2">
              <div className="mt-auto flex items-center justify-between gap-2">
                <Paragraph>{item.title}</Paragraph>
                <Paragraph>
                  {convertToLocale({ amount: item.total, currency_code: cart.currency_code })}
                </Paragraph>
              </div>

              <Paragraph className="text-muted-foreground">
                {item.product_collection},&nbsp;{item.variant_title}
              </Paragraph>
            </div>
          </div>
        ))}
      </div>

      <Separator />

      <div className="flex flex-col gap-2">
        {summaryData.map((data) => (
          <div
            key={data.title}
            className={cn("flex items-center justify-between gap-4", data.alt && "text-success")}
          >
            <Heading variant="h4">{data.title}</Heading>
            <Heading variant="h4">
              {data.alt && "-"}
              {convertToLocale({ amount: data.value, currency_code: cart.currency_code })}
            </Heading>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4">
        <Heading variant="h3">Total</Heading>
        <Heading variant="h3">
          {convertToLocale({ amount: cart.total, currency_code: cart.currency_code })}
        </Heading>
      </div>
    </div>
  );
}
