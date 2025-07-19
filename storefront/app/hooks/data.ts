import type { HttpTypes } from "@medusajs/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ky from "ky";
import { toast } from "sonner";

function successToast(description: string) {
  toast.success("Success", { description });
}

function errorToast(err: any) {
  const description = err.message ?? "Something went wrong. Please try again";
  toast.error("Error", { description });
}

// Cart
const cartKey = ["cart"];
export function useGetCart(initialData: HttpTypes.StoreCart | null) {
  return useQuery({
    queryKey: cartKey,
    queryFn: () => ky.get<HttpTypes.StoreCart>("/cart", { timeout: 1000 * 60 }).json(),
    initialData,
  });
}

export function useAddtoCart() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: { variantId: string; quantity: number }) =>
      ky.post("/cart", { json: data, timeout: 1000 * 60 }),
    onSuccess: () => {
      successToast("Item added successfully");
      qc.invalidateQueries({ queryKey: cartKey });
    },
    onError: (err) => errorToast(err),
  });
}

export function useRemoveCartItem() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: { lineId: string }) =>
      ky.delete("/cart", { json: data, timeout: 1000 * 60 }),
    onSuccess: () => {
      successToast("Item removed successfully");
      qc.invalidateQueries({ queryKey: cartKey });
    },
    onError: (err) => errorToast(err),
  });
}

export function useUpdateCartItem() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: { lineId: string; quantity: number }) =>
      ky.patch("/cart", { json: data, timeout: 1000 * 60 }),
    onSuccess: () => {
      successToast("Item updated successfully");
      qc.invalidateQueries({ queryKey: cartKey });
    },
    onError: (err) => errorToast(err),
  });
}

// Checkout
export function useCheckoutAddress() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: Record<string, any>) =>
      ky.patch("/checkout", { json: data, timeout: 1000 * 60 }),
    onSuccess: () => {
      successToast("Item updated successfully");
      qc.invalidateQueries({ queryKey: cartKey });
    },
    onError: (err) => errorToast(err),
  });
}
