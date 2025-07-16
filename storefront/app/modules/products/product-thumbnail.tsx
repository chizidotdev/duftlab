import type { HttpTypes } from "@medusajs/types";

import { cn } from "@/lib/utils";

export function ProductThumbnail({
  product,
  className,
  ...props
}: React.ComponentProps<"div"> & { product?: HttpTypes.StoreProduct }) {
  return (
    <div className={cn("aspect-[9/11] w-full rounded-md object-cover", className)} {...props}>
      <img src={product?.thumbnail ?? "/placeholder.svg"} className="size-full rounded-md" />
    </div>
  );
}
