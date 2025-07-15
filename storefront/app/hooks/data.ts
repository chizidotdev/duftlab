import { useMutation } from "@tanstack/react-query";
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
      fetch("/cart", { method: "POST", body: JSON.stringify(data) }),
    onSuccess: () => successToast("Item added successfully"),
    onError: (err) => errorToast(err),
  });
}
