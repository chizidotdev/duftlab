import type { HttpTypes } from "@medusajs/types";

import { cn } from "@/lib/utils";
import { getProductPrice } from "@/lib/utils/get-product-price";

export function ProductPrice({ product }: { product: HttpTypes.StoreProduct }) {
  const { cheapestPrice } = getProductPrice({ product });

  if (!cheapestPrice) return null;

  return (
    <>
      {cheapestPrice.price_type === "sale" && (
        <span className="line-through" data-testid="original-price">
          {cheapestPrice.original_price}
        </span>
      )}
      <span
        className={cn(cheapestPrice.price_type === "sale" && "text-muted-foreground")}
        data-testid="price"
      >
        {cheapestPrice.calculated_price}
      </span>
    </>
  );
}
