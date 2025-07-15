import { HttpTypes } from "@medusajs/types";

import { sdk } from "@/lib/config";

import { getAuthHeaders } from "./cookies";

export const listCartPaymentMethods = async (regionId: string, request?: Request) => {
  const headers = {
    ...getAuthHeaders(request),
  };

  return sdk.client
    .fetch<HttpTypes.StorePaymentProviderListResponse>(`/store/payment-providers`, {
      method: "GET",
      query: { region_id: regionId },
      headers,
    })
    .then(({ payment_providers }) =>
      payment_providers.sort((a, b) => {
        return a.id > b.id ? 1 : -1;
      })
    )
    .catch(() => {
      return null;
    });
};
