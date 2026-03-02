import Medusa from "@medusajs/js-sdk";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

// Defaults to standard port for Medusa server
let MEDUSA_BACKEND_URL = import.meta.env.VITE_MEDUSA_BACKEND_URL || "https://localhost:9000";

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  // debug: import.meta.env.MODE === "development",
  publishableKey: import.meta.env.VITE_MEDUSA_PUBLISHABLE_KEY,
});

export const { searchClient } = instantMeiliSearch(
  import.meta.env.VITE_MEILISEARCH_HOST || "",
  import.meta.env.VITE_MEILISEARCH_API_KEY || ""
);
export const MEILISEARCH_INDEX_NAME = import.meta.env.VITE_MEILISEARCH_INDEX_NAME || "duftlab";
