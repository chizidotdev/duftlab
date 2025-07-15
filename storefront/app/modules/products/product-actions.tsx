import { useEffect, useMemo, useState } from "react";

import type { HttpTypes } from "@medusajs/types";
import lodash from "lodash";

import { Button } from "@/components/ui/button";
import { Paragraph } from "@/components/ui/text";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { useAddtoCart } from "@/hooks/data";

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

  function addToCart() {
    if (!selectedVariant) return;
    mutate({ variantId: selectedVariant.id, quantity: 1 });
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {options.map((option) => (
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

      <Button isLoading={isPending} onClick={addToCart}>
        Add to cart
      </Button>
    </div>
  );
}
