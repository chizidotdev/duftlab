/**
 * Google Analytics 4 (gtag.js) event tracking utility
 * https://developers.google.com/analytics/devguides/collection/gtagjs
 */

const GA_MEASUREMENT_ID = "G-9W1TR1MPGF";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Initialize Google Analytics if window.gtag is available
 */
export function initializeGoogleAnalytics() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("config", GA_MEASUREMENT_ID);
}

/**
 * Track an event with Google Analytics 4
 * @param eventName - The name of the event
 * @param eventData - Additional event parameters
 */
export function trackEvent(eventName: string, eventData?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    console.debug(`[GA] Event tracked (offline): ${eventName}`, eventData);
    return;
  }

  window.gtag("event", eventName, eventData);
  console.debug(`[GA] Event tracked: ${eventName}`, eventData);
}

/**
 * Track page view
 * @param pageTitle - The title of the page
 * @param pagePath - The path of the page
 */
export function trackPageView(pageTitle: string, pagePath: string) {
  trackEvent("page_view", {
    page_title: pageTitle,
    page_path: pagePath,
  });
}

/**
 * Track an "add to cart" event
 * @param productId - Product ID
 * @param productTitle - Product title
 * @param quantity - Quantity added (default: 1)
 */
export function trackAddToCart(productId: string, productTitle: string, quantity: number = 1) {
  trackEvent("add_to_cart", {
    items: [
      {
        item_id: productId,
        item_name: productTitle,
        quantity,
      },
    ],
  });
}

/**
 * Track a "checkout" event
 * @param email - Customer email
 */
export function trackCheckout(email: string) {
  trackEvent("begin_checkout", {
    email,
  });
}
