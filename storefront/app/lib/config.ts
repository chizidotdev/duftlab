import Medusa from "@medusajs/js-sdk";

// Defaults to standard port for Medusa server
let MEDUSA_BACKEND_URL = import.meta.env.VITE_MEDUSA_BACKEND_URL || "https://localhost:9000";

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: import.meta.env.MODE === "development",
  publishableKey: import.meta.env.VITE_MEDUSA_PUBLISHABLE_KEY,
});
