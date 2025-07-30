import type { HttpTypes } from "@medusajs/types";

import { cn } from "@/lib/utils";

export function ProductThumbnail({
  product,
  className,
  ...props
}: React.ComponentProps<"div"> & { product?: HttpTypes.StoreProduct }) {
  return (
    <div
      className={cn(
        "bg-muted group relative flex aspect-[9/10] w-full items-center justify-center rounded border",
        className
      )}
      {...props}
    >
      <img
        src={product?.thumbnail ?? "/placeholder.svg"}
        className={cn(
          "size-5/6 object-contain transition-opacity duration-300",
          !!product?.images?.[1] && "group-hover:opacity-0"
        )}
      />
      {!!product?.images?.[1] && (
        <img
          src={product.images[1].url}
          className="absolute inset-[10%] size-[80%] object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
    </div>
  );
}
