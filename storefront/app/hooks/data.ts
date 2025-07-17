import { useMutation } from "@tanstack/react-query";
import ky from "ky";
import { toast } from "sonner";

function successToast(description: string) {
  toast.success("Success", { description });
}

function errorToast(err: any) {
  const description = err.message ?? "Something went wrong. Please try again";
  toast.error("Error", { description });
}

export function useAddtoCart() {
  return useMutation({
    mutationFn: async (data: { variantId: string; quantity: number }) =>
      ky.post("/cart", { json: data, timeout: 1000 * 60 }),
    onSuccess: () => successToast("Item added successfully"),
    onError: (err) => errorToast(err),
  });
}

export function useRemoveCartItem() {
  return useMutation({
    mutationFn: async (data: { lineId: string }) =>
      ky.delete("/cart", { json: data, timeout: 1000 * 60 }),
    onSuccess: () => successToast("Item removed successfully"),
    onError: (err) => errorToast(err),
  });
}
