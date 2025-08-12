import type { HttpTypes } from "@medusajs/types";

import { cn } from "@/lib/utils";

export function ProductThumbnail({
  product,
  className,
  ...props
}: React.ComponentProps<"div"> & { product?: HttpTypes.StoreProduct }) {
  const thumbnail = product?.thumbnail ?? product?.images?.[0]?.url ?? "/placeholder.svg";
  const packedThumbnail = product?.images?.[1];

  return (
    <div
      className={cn(
        "bg-muted group relative flex aspect-[9/10] w-full items-center justify-center rounded border",
        className
      )}
      {...props}
    >
      <img
        src={thumbnail}
        className={cn(
          "size-5/6 rounded-md object-contain transition-opacity duration-300",
          !!packedThumbnail && "group-hover:opacity-0"
        )}
      />
      {!!packedThumbnail && (
        <img
          src={packedThumbnail.url}
          className="absolute inset-[10%] size-[80%] object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
    </div>
  );
}
