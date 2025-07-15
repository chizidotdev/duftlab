// Cookie names
const MEDUSA_JWT_COOKIE = "_medusa_jwt";
const MEDUSA_CART_ID_COOKIE = "_medusa_cart_id";

// Cookie settings
const WEEK_IN_SECONDS = 60 * 60 * 24 * 7;
const COOKIE_BASE_OPTIONS = "HttpOnly; SameSite=Strict";
const SECURE_SUFFIX = import.meta.env.MODE === "production" ? "; Secure" : "";
const COOKIE_OPTIONS = `${COOKIE_BASE_OPTIONS}${SECURE_SUFFIX}`;

// Helper function to parse cookies from cookie header
function parseCookies(cookieHeader: string): Record<string, string> {
  return cookieHeader.split(";").reduce(
    (cookies, cookie) => {
      const [name, value] = cookie.trim().split("=");
      if (name && value) {
        cookies[name] = decodeURIComponent(value);
      }
      return cookies;
    },
    {} as Record<string, string>
  );
}

// Helper function to create a cookie string
function createCookieString(name: string, value: string, maxAge?: number): string {
  const encodedValue = encodeURIComponent(value);
  const ageAttribute = maxAge !== undefined ? `; Max-Age=${maxAge}` : "";
  return `${name}=${encodedValue}${ageAttribute}; ${COOKIE_OPTIONS}`;
}

// Helper function to delete a cookie
function deleteCookieString(name: string): string {
  return `${name}=; Max-Age=0; ${COOKIE_OPTIONS}`;
}

export const getAuthHeaders = (request?: Request): { authorization: string } | {} => {
  try {
    if (!request) return {};

    const cookieHeader = request.headers.get("Cookie");
    if (!cookieHeader) return {};

    const cookies = parseCookies(cookieHeader);
    const token = cookies[MEDUSA_JWT_COOKIE];

    if (!token) {
      return {};
    }

    return { authorization: `Bearer ${token}` };
  } catch {
    return {};
  }
};

export const setAuthToken = (token: string, headers: Headers) => {
  const cookieValue = createCookieString(MEDUSA_JWT_COOKIE, token, WEEK_IN_SECONDS);
  headers.append("Set-Cookie", cookieValue);
};

export const removeAuthToken = (headers: Headers) => {
  const cookieValue = deleteCookieString(MEDUSA_JWT_COOKIE);
  headers.append("Set-Cookie", cookieValue);
};

export const getCartId = (request?: Request): string | undefined => {
  if (!request) return undefined;

  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) return undefined;

  const cookies = parseCookies(cookieHeader);
  return cookies[MEDUSA_CART_ID_COOKIE];
};

export const setCartId = (cartId: string, headers: Headers) => {
  const cookieValue = createCookieString(MEDUSA_CART_ID_COOKIE, cartId, WEEK_IN_SECONDS);
  headers.append("Set-Cookie", cookieValue);
};

export const removeCartId = (headers: Headers) => {
  const cookieValue = deleteCookieString(MEDUSA_CART_ID_COOKIE);
  headers.append("Set-Cookie", cookieValue);
};
