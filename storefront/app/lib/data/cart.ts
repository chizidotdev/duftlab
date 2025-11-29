import { HttpTypes } from "@medusajs/types";

import { sdk } from "@/lib/config";
import medusaError from "@/lib/utils/medusa-error";

import { getAuthHeaders, getCartId, removeCartId, setCartId } from "./cookies";
import { listCartPaymentMethods } from "./payment";
import { getRegion } from "./regions";

/**
 * Retrieves a cart by its ID. If no ID is provided, it will use the cart ID from the cookies.
 * @param cartId - optional - The ID of the cart to retrieve.
 * @returns The cart object if found, or null if not found.
 */
export async function retrieveCart(request: Request, cartId?: string) {
  const id = cartId || getCartId(request);

  if (!id) {
    return null;
  }

  const headers = {
    ...getAuthHeaders(request),
  };

  return await sdk.client
    .fetch<HttpTypes.StoreCartResponse>(`/store/carts/${id}`, {
      method: "GET",
      query: {
        fields:
          "*items, *region, *items.product.categories, *items.variant, *items.thumbnail, *items.metadata, +items.total, *promotions, +shipping_methods.name",
      },
      headers,
    })
    .then(({ cart }) => cart)
    .catch((err) => {
      console.log("cart with provided id not found", id);
      return medusaError(err);
    });
}

export async function getOrSetCart(
  request: Request,
  responseHeaders: Headers,
  countryCode?: string
) {
  const region = await getRegion(countryCode);

  if (!region) {
    throw new Error(`Region not found for country code: ${countryCode}`);
  }

  let cart = await retrieveCart(request);

  const headers = {
    ...getAuthHeaders(request),
  };

  if (!cart) {
    const cartResp = await sdk.store.cart.create({ region_id: region.id }, {}, headers);
    cart = cartResp.cart;

    if (responseHeaders) {
      setCartId(cart.id, responseHeaders);
    }
  }

  if (cart && cart?.region_id !== region.id) {
    await sdk.store.cart.update(cart.id, { region_id: region.id }, {}, headers);
  }

  return cart;
}

export async function updateCart(request: Request, data: HttpTypes.StoreUpdateCart) {
  const cartId = getCartId(request);

  if (!cartId) {
    throw new Error("No existing cart found, please create one before updating");
  }

  const headers = {
    ...getAuthHeaders(request),
  };

  return sdk.store.cart
    .update(cartId, data, {}, headers)
    .then(({ cart }) => cart)
    .catch(medusaError);
}

export async function addToCart(
  request: Request,
  {
    variantId,
    quantity,
    countryCode,
    responseHeaders,
  }: {
    variantId: string;
    quantity: number;
    responseHeaders: Headers;
    countryCode?: string;
  }
) {
  if (!variantId) {
    throw new Error("Missing variant ID when adding to cart");
  }

  const cart = await getOrSetCart(request, responseHeaders, countryCode);

  if (!cart) {
    throw new Error("Error retrieving or creating cart");
  }

  const headers = {
    ...getAuthHeaders(request),
  };

  await sdk.store.cart
    .createLineItem(cart.id, { variant_id: variantId, quantity }, {}, headers)
    .then(() => {})
    .catch(medusaError);
}

export async function updateLineItem(request: Request, data: { lineId: string; quantity: number }) {
  const { lineId, quantity } = data;

  if (!lineId) {
    throw new Error("Missing lineItem ID when updating line item");
  }

  const cartId = getCartId(request);

  if (!cartId) {
    throw new Error("Missing cart ID when updating line item");
  }

  const headers = {
    ...getAuthHeaders(request),
  };

  await sdk.store.cart
    .updateLineItem(cartId, lineId, { quantity }, {}, headers)
    .then(() => {})
    .catch(medusaError);
}

export async function deleteLineItem(request: Request, lineId: string) {
  if (!lineId) {
    throw new Error("Missing lineItem ID when deleting line item");
  }

  const cartId = getCartId(request);

  if (!cartId) {
    throw new Error("Missing cart ID when deleting line item");
  }

  const headers = {
    ...getAuthHeaders(request),
  };

  await sdk.store.cart
    .deleteLineItem(cartId, lineId, headers)
    .then(() => {})
    .catch(medusaError);
}

export async function setShippingMethod(
  request: Request,
  { shippingMethodId }: { shippingMethodId: string }
) {
  const cartId = getCartId(request);
  if (!cartId) {
    throw new Error("No existing cart found when setting addresses");
  }

  const headers = {
    ...getAuthHeaders(request),
  };

  return sdk.store.cart
    .addShippingMethod(cartId, { option_id: shippingMethodId }, {}, headers)
    .then(() => {})
    .catch(medusaError);
}

export async function initiatePaymentSession(
  request: Request,
  cart: HttpTypes.StoreCart,
  data: HttpTypes.StoreInitializePaymentSession
) {
  const headers = {
    ...getAuthHeaders(request),
  };

  return sdk.store.payment
    .initiatePaymentSession(cart, data, {}, headers)
    .then((resp) => resp)
    .catch(medusaError);
}

export async function applyPromotions(codes: string[], request?: Request) {
  const cartId = getCartId(request);

  if (!cartId) {
    throw new Error("No existing cart found");
  }

  const headers = {
    ...getAuthHeaders(request),
  };

  return sdk.store.cart
    .update(cartId, { promo_codes: codes }, {}, headers)
    .then(() => {})
    .catch(medusaError);
}

export async function applyGiftCard() {
  //   const cartId = getCartId()
  //   if (!cartId) return "No cartId cookie found"
  //   try {
  //     await updateCart(cartId, { gift_cards: [{ code }] }).then(() => {
  //       revalidateTag("cart")
  //     })
  //   } catch (error: any) {
  //     throw error
  //   }
}

export async function removeDiscount() {
  // const cartId = getCartId()
  // if (!cartId) return "No cartId cookie found"
  // try {
  //   await deleteDiscount(cartId, code)
  //   revalidateTag("cart")
  // } catch (error: any) {
  //   throw error
  // }
}

export async function removeGiftCard() {
  // giftCards: GiftCard[]
  //   const cartId = getCartId()
  //   if (!cartId) return "No cartId cookie found"
  //   try {
  //     await updateCart(cartId, {
  //       gift_cards: [...giftCards]
  //         .filter((gc) => gc.code !== codeToRemove)
  //         .map((gc) => ({ code: gc.code })),
  //     }).then(() => {
  //       revalidateTag("cart")
  //     })
  //   } catch (error: any) {
  //     throw error
  //   }
}

export async function submitPromotionForm(formData: FormData, request?: Request) {
  const code = formData.get("code") as string;
  try {
    await applyPromotions([code], request);
  } catch (e: any) {
    return e.message;
  }
}

interface AddressData {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2?: string;
  company?: string;
  postal_code: string;
  city: string;
  country_code: string;
  province: string;
  phone: string;
}

export interface SetAddressesData {
  shipping_address: AddressData;
  billing_address?: AddressData;
  email: string;
  same_as_billing?: boolean;
}

export async function setAddresses(request: Request, data: SetAddressesData) {
  try {
    const updateData = {
      shipping_address: {
        ...data.shipping_address,
        address_2: data.shipping_address.address_2 || "",
      },
      email: data.email,
    } as any;

    if (data.same_as_billing) {
      updateData.billing_address = updateData.shipping_address;
    } else if (data.billing_address) {
      updateData.billing_address = {
        ...data.billing_address,
        address_2: data.billing_address.address_2 || "",
      };
    }

    const cart = await updateCart(request, updateData);

    // initialize payment session after updating the cart with customer email
    const paymentMethods = await listCartPaymentMethods(request, cart.region?.id ?? "");
    const pp_paystack = paymentMethods?.find((p) => p.id === "pp_paystack");

    if (!pp_paystack) throw Error("Paystack payment method not found");

    await initiatePaymentSession(request, cart, {
      provider_id: pp_paystack.id,
      data: { email: data.email },
    });
  } catch (e: any) {
    return e.message;
  }

  return { redirectTo: `/${data.shipping_address.country_code}/checkout?step=delivery` };
}

/**
 * Places an order for a cart. If no cart ID is provided, it will use the cart ID from the cookies.
 * @param cartId - optional - The ID of the cart to place an order for.
 * @returns The cart object if the order was successful, or null if not.
 */
export async function placeOrder(cartId?: string, request?: Request, responseHeaders?: Headers) {
  const id = cartId || getCartId(request);

  if (!id) {
    throw new Error("No existing cart found when placing an order");
  }

  const headers = {
    ...getAuthHeaders(request),
  };

  const cartRes = await sdk.store.cart
    .complete(id, {}, headers)
    .then((cartRes) => cartRes)
    .catch(medusaError);

  if (cartRes?.type === "order") {
    const countryCode = cartRes.order.shipping_address?.country_code?.toLowerCase();

    if (responseHeaders) {
      removeCartId(responseHeaders);
    }

    return {
      order: cartRes.order,
      redirectTo: `/${countryCode}/order/${cartRes?.order.id}/confirmed`,
    };
  }

  return cartRes.cart;
}

/**
 * Updates the countrycode param and revalidates the regions cache
 * @param regionId
 * @param countryCode
 */
export async function updateRegion(request: Request, countryCode: string, currentPath: string) {
  const cartId = getCartId(request);
  const region = await getRegion(countryCode);

  if (!region) {
    throw new Error(`Region not found for country code: ${countryCode}`);
  }

  if (cartId) {
    await updateCart(request, { region_id: region.id });
  }

  return { redirectTo: `/${countryCode}${currentPath}` };
}

export async function listCartOptions(request?: Request) {
  const cartId = getCartId(request);
  const headers = {
    ...getAuthHeaders(request),
  };
  return await sdk.client.fetch<{
    shipping_options: HttpTypes.StoreCartShippingOption[];
  }>("/store/shipping-options", {
    query: { cart_id: cartId },
    headers,
  });
}
