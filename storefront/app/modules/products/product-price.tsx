import type { HttpTypes } from "@medusajs/types";

import { cn } from "@/lib/utils";
import { getProductPrice } from "@/lib/utils/get-product-price";

export function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct;
  variant?: HttpTypes.StoreProductVariant;
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({ product, variantId: variant?.id });
  const selectedPrice = variant ? variantPrice : cheapestPrice;

  if (!selectedPrice) return null;

  return (
    <>
      {selectedPrice.price_type === "sale" && (
        <span className="line-through" data-testid="original-price">
          {selectedPrice.original_price}
        </span>
      )}
      <span
        className={cn(selectedPrice.price_type === "sale" && "text-muted-foreground")}
        data-testid="price"
      >
        {selectedPrice.calculated_price}
      </span>
    </>
  );
}
