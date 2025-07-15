// Cookie settings
const COOKIE_BASE_OPTIONS = "HttpOnly; SameSite=Strict";
const SECURE_SUFFIX = import.meta.env.MODE === "production" ? "; Secure" : "";
const COOKIE_OPTIONS = `${COOKIE_BASE_OPTIONS}${SECURE_SUFFIX}`;

export function resetOnboardingState(orderId: string, responseHeaders?: Headers) {
  if (responseHeaders) {
    const cookieValue = `_medusa_onboarding=false; Max-Age=0; ${COOKIE_OPTIONS}`;
    responseHeaders.append("Set-Cookie", cookieValue);
  }

  return { redirectTo: `http://localhost:7001/a/orders/${orderId}` };
}
