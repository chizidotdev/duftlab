import type { HttpTypes } from "@medusajs/types";

import { Button } from "@/components/ui/button";
import { Heading, Paragraph } from "@/components/ui/text";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { ProductPrice } from "@/modules/products/product-price";
import { useProductActions } from "@/modules/products/use-product-actions";

export function ProductActions({
  product,
}: React.ComponentProps<"button"> & { product: HttpTypes.StoreProduct }) {
  const {
    selectedVariant,
    options,
    selectedOptions,
    setSelectedOptions,
    isValidVariant,
    inStock,
    addToCart,
    isPending,
  } = useProductActions(product);

  return (
    <div className="flex flex-col gap-2">
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.id} className="flex items-center gap-2">
            <Paragraph>{option.title}</Paragraph>
            <ToggleGroup
              type="single"
              variant="outline"
              value={selectedOptions[option.id]}
              onValueChange={(value) =>
                setSelectedOptions((prev) => ({ ...prev, [option.id]: value }))
              }
            >
              {option.values?.map((v) => (
                <ToggleGroupItem key={v.id} value={v.value}>
                  {v.value}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        ))}
      </div>

      <Heading variant="h3">
        <ProductPrice product={product} variant={selectedVariant} />
      </Heading>

      <Button disabled={!inStock || !isValidVariant} isLoading={isPending} onClick={addToCart}>
        {!inStock ? "Out of stock" : "Add to cart"}
      </Button>
    </div>
  );
}
