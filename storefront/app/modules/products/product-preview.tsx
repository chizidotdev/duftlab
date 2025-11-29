import { Link } from "react-router";

import type { HttpTypes } from "@medusajs/types";
import { PlusIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Paragraph } from "@/components/ui/text";

import { ProductPrice } from "./product-price";
import { ProductThumbnail } from "./product-thumbnail";
import { useProductActions } from "./use-product-actions";

export function ProductPreview({ product }: { product: HttpTypes.StoreProduct }) {
  const collection = product.collection;
  const { isValidVariant, inStock, addToCart, isPending } = useProductActions(product);

  return (
    <Link
      prefetch="viewport"
      data-testid="product-wrapper"
      to={`/products/${product.handle}`}
      className="flex w-full flex-col gap-2"
    >
      <div className="relative">
        {!!collection?.title && (
          <Badge variant="outline" className="absolute top-2 left-2 z-10 sm:top-3 sm:left-3">
            {collection.title}
          </Badge>
        )}
        <ProductThumbnail product={product} />
        <Button
          className="absolute right-2 bottom-2 z-10 size-8 sm:right-3 sm:bottom-3 lg:size-9"
          variant="outline"
          size="icon"
          isLoading={isPending}
          disabled={!inStock || !isValidVariant}
          onClick={(e) => {
            e.preventDefault();
            addToCart();
          }}
        >
          <PlusIcon />
        </Button>
      </div>
      <div className="flex flex-col flex-wrap justify-between gap-x-4 px-2 text-sm sm:flex-row sm:items-center sm:text-base">
        <Paragraph data-testid="product-title">{product.title}</Paragraph>
        <ProductPrice product={product} />
      </div>
    </Link>
  );
}
