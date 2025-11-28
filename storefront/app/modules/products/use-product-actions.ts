import { useEffect, useMemo, useState } from "react";

import type { HttpTypes } from "@medusajs/types";
import lodash from "lodash";

import { useAddtoCart } from "@/hooks/data";
import { trackAddToCart } from "@/lib/analytics";
import { useCartSheet } from "@/modules/cart/use-cart-sheet";

const { isEqual } = lodash;

const optionsAsKeymap = (variantOptions: HttpTypes.StoreProductVariant["options"]) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value;
    return acc;
  }, {});
};

export function useProductActions(product: HttpTypes.StoreProduct) {
  const { setOpen } = useCartSheet();
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

  // Check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options);
      return isEqual(variantOptions, selectedOptions);
    });
  }, [product.variants, selectedOptions]);

  // Check if the selected variant is in stock
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
    trackAddToCart(product.id, product.title);
    mutate({ variantId: selectedVariant.id, quantity: 1 }, { onSuccess: () => setOpen(true) });
  }

  return {
    options,
    selectedOptions,
    setSelectedOptions,
    selectedVariant,
    isValidVariant,
    inStock,
    addToCart,
    isPending,
  };
}
