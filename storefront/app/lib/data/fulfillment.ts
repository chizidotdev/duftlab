import { HttpTypes } from "@medusajs/types";

import { sdk } from "@/lib/config";

import { getAuthHeaders } from "./cookies";

export const listCartShippingMethods = async (cartId: string, request?: Request) => {
  const headers = {
    ...getAuthHeaders(request),
  };

  return sdk.client
    .fetch<HttpTypes.StoreShippingOptionListResponse>(`/store/shipping-options`, {
      method: "GET",
      query: {
        cart_id: cartId,
        fields: "+service_zone.fulfllment_set.type,*service_zone.fulfillment_set.location.address",
      },
      headers,
    })
    .then(({ shipping_options }) => shipping_options)
    .catch(() => {
      return null;
    });
};

export const calculatePriceForShippingOption = async (
  optionId: string,
  cartId: string,
  data?: Record<string, unknown>,
  request?: Request
) => {
  const headers = {
    ...getAuthHeaders(request),
  };

  const body = { cart_id: cartId, data };

  if (data) {
    body.data = data;
  }

  return sdk.client
    .fetch<{ shipping_option: HttpTypes.StoreCartShippingOption }>(
      `/store/shipping-options/${optionId}/calculate`,
      {
        method: "POST",
        body,
        headers,
      }
    )
    .then(({ shipping_option }) => shipping_option)
    .catch((e) => {
      return null;
    });
};
