import type { HttpTypes } from "@medusajs/types";

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
    <span className="inline-flex items-center gap-2">
      <span data-testid="price">{selectedPrice.calculated_price}</span>
      {selectedPrice.price_type === "sale" && (
        <span className="text-muted-foreground line-through" data-testid="original-price">
          {selectedPrice.original_price}
        </span>
      )}
    </span>
  );
}
