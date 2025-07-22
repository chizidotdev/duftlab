import type { HttpTypes } from "@medusajs/types";

import { cn } from "@/lib/utils";

export function ProductThumbnail({
  product,
  className,
  ...props
}: React.ComponentProps<"div"> & { product?: HttpTypes.StoreProduct }) {
  return (
    <div
      className={cn("bg-muted group relative aspect-[9/10] w-full rounded", className)}
      {...props}
    >
      <img
        src={product?.thumbnail ?? "/placeholder.svg"}
        className="size-full rounded object-contain transition-opacity group-hover:opacity-0"
      />
      <img
        src={product?.images?.[1].url ?? "/placeholder.svg"}
        className="absolute inset-[15%] size-[70%] rounded object-cover opacity-0 transition-opacity group-hover:opacity-100"
      />
    </div>
  );
}
