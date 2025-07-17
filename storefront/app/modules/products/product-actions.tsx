import { useEffect, useMemo, useState } from "react";

import type { HttpTypes } from "@medusajs/types";
import lodash from "lodash";

import { Button } from "@/components/ui/button";
import { Heading, Paragraph } from "@/components/ui/text";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { useAddtoCart } from "@/hooks/data";
import { ProductPrice } from "@/modules/products/product-price";

const { isEqual } = lodash;

const optionsAsKeymap = (variantOptions: HttpTypes.StoreProductVariant["options"]) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value;
    return acc;
  }, {});
};

export function ProductActions({
  product,
}: React.ComponentProps<"button"> & { product: HttpTypes.StoreProduct }) {
  const { mutate, isPending } = useAddtoCart();

  const options = product.options ?? [];
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const selectedVariant = useMemo(() => {
    if (!product.variants?.length) return;

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options);
      return isEqual(variantOptions, selectedOptions);
    });
  }, [product.variants, selectedOptions]);

  useEffect(() => {
    // Preselect the first options
    if (!!product.variants?.length) {
      const variantOptions = optionsAsKeymap(product.variants[0].options);
      setSelectedOptions(variantOptions ?? {});
    }
  }, [product.variants]);

  //check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options);
      return isEqual(variantOptions, selectedOptions);
    });
  }, [product.variants, selectedOptions]);

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true;
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true;
    }

    // If there is inventory available, we can add to cart
    if (selectedVariant?.manage_inventory && (selectedVariant?.inventory_quantity || 0) > 0) {
      return true;
    }

    // Otherwise, we can't add to cart
    return false;
  }, [selectedVariant]);

  function addToCart() {
    if (!selectedVariant) return;
    mutate({ variantId: selectedVariant.id, quantity: 1 });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        {(product.variants?.length || 0) > 1 &&
          options.map((option) => (
            <div key={option.id}>
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

      <Heading variant="h4">
        <ProductPrice product={product} />
      </Heading>

      <Button disabled={!inStock || !isValidVariant} isLoading={isPending} onClick={addToCart}>
        {!inStock ? "Out of stock" : "Add to cart"}
      </Button>
    </div>
  );
}
