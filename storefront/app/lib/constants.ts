import { CreditCard, type LucideIcon } from "lucide-react";

export const DEFAULT_COUNTRY_CODE = "ng";

export const CACHE_HEADERS = {
  "Cache-Control": "public, max-age=1, stale-while-revalidate=604800",
  "Cloudflare-CDN-Cache-Control": "max-age=1, stale-while-revalidate=604800",
};

/* Map of payment provider_id to their title and icon. Add in any payment providers you want to use. */
export const paymentInfoMap: Record<string, { title: string; icon: LucideIcon }> = {
  pp_stripe_stripe: {
    title: "Credit card",
    icon: CreditCard,
  },
  "pp_stripe-ideal_stripe": {
    title: "iDeal",
    icon: CreditCard,
  },
  "pp_stripe-bancontact_stripe": {
    title: "Bancontact",
    icon: CreditCard,
  },
  pp_paypal_paypal: {
    title: "PayPal",
    icon: CreditCard,
  },
  pp_system_default: {
    title: "Manual Payment",
    icon: CreditCard,
  },
  // Add more payment providers here
};

// This only checks if it is native stripe for card payments, it ignores the other stripe-based providers
export const isStripe = (providerId?: string) => {
  return providerId?.startsWith("pp_stripe_");
};
export const isPaypal = (providerId?: string) => {
  return providerId?.startsWith("pp_paypal");
};
export const isManual = (providerId?: string) => {
  return providerId?.startsWith("pp_system_default");
};

// Add currencies that don't need to be divided by 100
export const noDivisionCurrencies = [
  "krw",
  "jpy",
  "vnd",
  "clp",
  "pyg",
  "xaf",
  "xof",
  "bif",
  "djf",
  "gnf",
  "kmf",
  "mga",
  "rwf",
  "xpf",
  "htg",
  "vuv",
  "xag",
  "xdr",
  "xau",
];
