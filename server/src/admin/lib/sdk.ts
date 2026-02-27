import Medusa from "@medusajs/js-sdk";

export const sdk = new Medusa({
  baseUrl: import.meta.env.MEDUSA_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: {
    type: "session",
  },
});
