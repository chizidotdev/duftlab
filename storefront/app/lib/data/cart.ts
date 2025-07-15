import { HttpTypes } from "@medusajs/types";

import { sdk } from "@/lib/config";
import medusaError from "@/lib/utils/medusa-error";

import { getAuthHeaders, getCartId, removeCartId, setCartId } from "./cookies";
import { getRegion } from "./regions";

/**
 * Retrieves a cart by its ID. If no ID is provided, it will use the cart ID from the cookies.
 * @param cartId - optional - The ID of the cart to retrieve.
 * @returns The cart object if found, or null if not found.
 */
export async function retrieveCart(request?: Request, cartId?: string) {
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
          "*items, *region, *items.product, *items.variant, *items.thumbnail, *items.metadata, +items.total, *promotions, +shipping_methods.name",
      },
      headers,
    })
    .then(({ cart }) => cart)
    .catch(() => null);
}

export async function getOrSetCart(
  request: Request,
  countryCode?: string,
  responseHeaders?: Headers
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

export async function updateCart(data: HttpTypes.StoreUpdateCart, request?: Request) {
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
    countryCode?: string;
    responseHeaders?: Headers;
  }
) {
  if (!variantId) {
    throw new Error("Missing variant ID when adding to cart");
  }

  const cart = await getOrSetCart(request, countryCode, responseHeaders);

  if (!cart) {
    throw new Error("Error retrieving or creating cart");
  }

  const headers = {
    ...getAuthHeaders(request),
  };

  await sdk.store.cart
    .createLineItem(
      cart.id,
      {
        variant_id: variantId,
        quantity,
      },
      {},
      headers
    )
    .then(() => {})
    .catch(medusaError);
}

export async function updateLineItem({
  lineId,
  quantity,
  request,
}: {
  lineId: string;
  quantity: number;
  request?: Request;
}) {
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

export async function deleteLineItem(lineId: string, request?: Request) {
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

export async function setShippingMethod({
  cartId,
  shippingMethodId,
  request,
}: {
  cartId: string;
  shippingMethodId: string;
  request?: Request;
}) {
  const headers = {
    ...getAuthHeaders(request),
  };

  return sdk.store.cart
    .addShippingMethod(cartId, { option_id: shippingMethodId }, {}, headers)
    .then(() => {})
    .catch(medusaError);
}

export async function initiatePaymentSession(
  cart: HttpTypes.StoreCart,
  data: HttpTypes.StoreInitializePaymentSession,
  request?: Request
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

// TODO: Pass a POJO instead of a form entity here
export async function setAddresses(formData: FormData, request?: Request) {
  try {
    if (!formData) {
      throw new Error("No form data found when setting addresses");
    }
    const cartId = getCartId(request);
    if (!cartId) {
      throw new Error("No existing cart found when setting addresses");
    }

    const data = {
      shipping_address: {
        first_name: formData.get("shipping_address.first_name"),
        last_name: formData.get("shipping_address.last_name"),
        address_1: formData.get("shipping_address.address_1"),
        address_2: "",
        company: formData.get("shipping_address.company"),
        postal_code: formData.get("shipping_address.postal_code"),
        city: formData.get("shipping_address.city"),
        country_code: formData.get("shipping_address.country_code"),
        province: formData.get("shipping_address.province"),
        phone: formData.get("shipping_address.phone"),
      },
      email: formData.get("email"),
    } as any;

    const sameAsBilling = formData.get("same_as_billing");
    if (sameAsBilling === "on") data.billing_address = data.shipping_address;

    if (sameAsBilling !== "on")
      data.billing_address = {
        first_name: formData.get("billing_address.first_name"),
        last_name: formData.get("billing_address.last_name"),
        address_1: formData.get("billing_address.address_1"),
        address_2: "",
        company: formData.get("billing_address.company"),
        postal_code: formData.get("billing_address.postal_code"),
        city: formData.get("billing_address.city"),
        country_code: formData.get("billing_address.country_code"),
        province: formData.get("billing_address.province"),
        phone: formData.get("billing_address.phone"),
      };
    await updateCart(data);
  } catch (e: any) {
    return e.message;
  }

  return { redirectTo: `/${formData.get("shipping_address.country_code")}/checkout?step=delivery` };
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
export async function updateRegion(countryCode: string, currentPath: string, request?: Request) {
  const cartId = getCartId(request);
  const region = await getRegion(countryCode);

  if (!region) {
    throw new Error(`Region not found for country code: ${countryCode}`);
  }

  if (cartId) {
    await updateCart({ region_id: region.id }, request);
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
