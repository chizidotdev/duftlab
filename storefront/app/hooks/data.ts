import type { HttpTypes } from "@medusajs/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ky from "ky";
import { toast } from "sonner";

import type { SetAddressesData } from "@/lib/data/cart";

const api = ky.extend({ timeout: 1000 * 30 });

function successToast(description: string) {
  toast.success("Success", { description });
}

function errorToast(err: any) {
  const description = /* err.message ?? */ "Something went wrong. Please try again";
  toast.error("Error", { description });
}

// Cart
const cartKey = ["cart"];
export function useGetCart(initialData: HttpTypes.StoreCart | null) {
  return useQuery({
    queryKey: cartKey,
    queryFn: () => api.get<HttpTypes.StoreCart>("/api/cart").json(),
    initialData,
  });
}

export function useAddtoCart() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: { variantId: string; quantity: number }) =>
      api.post("/api/cart", { json: data }),
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
    mutationFn: async (data: { lineId: string }) => api.delete("/api/cart", { json: data }),
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
      api.patch("/api/cart", { json: data }),
    onSuccess: () => {
      successToast("Item updated successfully");
      qc.invalidateQueries({ queryKey: cartKey });
    },
    onError: (err) => errorToast(err),
  });
}

// Checkout
export function useShippingAddress() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: SetAddressesData) => api.post("/api/checkout", { json: data }),
    onSuccess: () => {
      successToast("Address updated successfully");
      qc.invalidateQueries({ queryKey: cartKey });
    },
    onError: (err) => errorToast(err),
  });
}

export function useShippingMethod() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (shippingMethodId: string) =>
      api.patch("/api/checkout", { json: { shippingMethodId } }),
    onSuccess: () => {
      successToast("Shipping method updated successfully");
      qc.invalidateQueries({ queryKey: cartKey });
    },
    onError: (err) => errorToast(err),
  });
}
