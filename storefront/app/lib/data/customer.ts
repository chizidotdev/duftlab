import { HttpTypes } from "@medusajs/types";

import { sdk } from "@/lib/config";
import medusaError from "@/lib/utils/medusa-error";

import { getAuthHeaders, getCartId, removeAuthToken, removeCartId, setAuthToken } from "./cookies";

export const retrieveCustomer = async (
  request: Request
): Promise<HttpTypes.StoreCustomer | null> => {
  const authHeaders = getAuthHeaders(request);

  if (!authHeaders || Object.keys(authHeaders).length === 0) return null;

  const headers = {
    ...authHeaders,
  };

  return await sdk.client
    .fetch<{ customer: HttpTypes.StoreCustomer }>(`/store/customers/me`, {
      method: "GET",
      query: {
        fields: "*orders",
      },
      headers,
    })
    .then(({ customer }) => customer)
    .catch(() => null);
};

export const updateCustomer = async (body: HttpTypes.StoreUpdateCustomer, request?: Request) => {
  const headers = {
    ...getAuthHeaders(request),
  };

  const updateRes = await sdk.store.customer
    .update(body, {}, headers)
    .then(({ customer }) => customer)
    .catch(medusaError);

  return updateRes;
};

export async function signup(
  request: Request,
  data: { email: string; password: string; first_name: string; last_name: string; phone?: string },
  responseHeaders?: Headers
) {
  const { password, ...customerForm } = data;

  try {
    const token = await sdk.auth.register("customer", "emailpass", {
      email: customerForm.email,
      password: password,
    });

    if (responseHeaders) {
      setAuthToken(token as string, responseHeaders);
    }

    const { customer: createdCustomer } = await sdk.store.customer.create(
      customerForm,
      {},
      { authorization: `Bearer ${token}` }
    );

    const loginToken = await sdk.auth.login("customer", "emailpass", {
      email: customerForm.email,
      password,
    });

    if (responseHeaders) {
      setAuthToken(loginToken as string, responseHeaders);
    }

    await transferCart(request, { authorization: `Bearer ${loginToken}` });

    return createdCustomer;
  } catch (error) {
    return medusaError(error);
  }
}

export async function login(
  request: Request,
  data: { email: string; password: string },
  responseHeaders?: Headers
) {
  let loginToken = "";
  try {
    await sdk.auth.login("customer", "emailpass", data).then((token) => {
      loginToken = token as string;
      if (responseHeaders) {
        setAuthToken(token as string, responseHeaders);
      }
    });
  } catch (error: any) {
    return medusaError(error);
  }

  try {
    await transferCart(request, { authorization: `Bearer ${loginToken}` });
  } catch (error) {
    return medusaError(error);
  }
}

export async function signout(countryCode: string, responseHeaders?: Headers) {
  await sdk.auth.logout();

  if (responseHeaders) {
    removeAuthToken(responseHeaders);
    removeCartId(responseHeaders);
  }

  return { redirectTo: `/${countryCode}/account` };
}

export async function transferCart(request: Request, authHeaders?: object) {
  const cartId = getCartId(request);

  if (!cartId) {
    return;
  }

  const headers = authHeaders ?? getAuthHeaders(request);

  await sdk.store.cart.transferCart(cartId, {}, headers);
}

export const addCustomerAddress = async (formData: FormData, request?: Request): Promise<any> => {
  const currentState: Record<string, unknown> = {};
  const isDefaultBilling = (currentState.isDefaultBilling as boolean) || false;
  const isDefaultShipping = (currentState.isDefaultShipping as boolean) || false;

  const address = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    company: formData.get("company") as string,
    address_1: formData.get("address_1") as string,
    address_2: formData.get("address_2") as string,
    city: formData.get("city") as string,
    postal_code: formData.get("postal_code") as string,
    province: formData.get("province") as string,
    country_code: formData.get("country_code") as string,
    phone: formData.get("phone") as string,
    is_default_billing: isDefaultBilling,
    is_default_shipping: isDefaultShipping,
  };

  const headers = {
    ...getAuthHeaders(request),
  };

  return sdk.store.customer
    .createAddress(address, {}, headers)
    .then(({}) => {
      return { success: true, error: null };
    })
    .catch((err) => {
      return { success: false, error: err.toString() };
    });
};

export const deleteCustomerAddress = async (addressId: string, request?: Request): Promise<any> => {
  const headers = {
    ...getAuthHeaders(request),
  };

  await sdk.store.customer
    .deleteAddress(addressId, headers)
    .then(() => {
      return { success: true, error: null };
    })
    .catch((err) => {
      return { success: false, error: err.toString() };
    });
};

export async function resetPassword(email: string) {
  try {
    await sdk.auth.resetPassword("customer", "emailpass", {
      identifier: email,
    });
    return { success: true };
  } catch (error: any) {
    return medusaError(error);
  }
}

export async function confirmPasswordReset(_email: string, password: string, token: string) {
  try {
    await sdk.auth.updateProvider("customer", "emailpass", { password }, token);
    return { success: true };
  } catch (error: any) {
    return medusaError(error);
  }
}

export const updateCustomerAddress = async (
  formData: FormData,
  request?: Request
): Promise<any> => {
  const addressId = formData.get("addressId") as string;

  if (!addressId) {
    return { success: false, error: "Address ID is required" };
  }

  const address = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    company: formData.get("company") as string,
    address_1: formData.get("address_1") as string,
    address_2: formData.get("address_2") as string,
    city: formData.get("city") as string,
    postal_code: formData.get("postal_code") as string,
    province: formData.get("province") as string,
    country_code: formData.get("country_code") as string,
  } as HttpTypes.StoreUpdateCustomerAddress;

  const phone = formData.get("phone") as string;

  if (phone) {
    address.phone = phone;
  }

  const headers = {
    ...getAuthHeaders(request),
  };

  return sdk.store.customer
    .updateAddress(addressId, address, {}, headers)
    .then(() => {
      return { success: true, error: null };
    })
    .catch((err) => {
      return { success: false, error: err.toString() };
    });
};
