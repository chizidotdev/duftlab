import { HttpTypes } from "@medusajs/types";

import { sdk } from "@/lib/config";

export const retrieveCollection = async (id: string) => {
  return sdk.client
    .fetch<{ collection: HttpTypes.StoreCollection }>(`/store/collections/${id}`, {})
    .then(({ collection }) => collection);
};

export const listCollections = async (
  queryParams: Record<string, string> = {}
): Promise<{ collections: HttpTypes.StoreCollection[]; count: number }> => {
  queryParams.limit = queryParams.limit || "100";
  queryParams.offset = queryParams.offset || "0";

  return sdk.client
    .fetch<{ collections: HttpTypes.StoreCollection[]; count: number }>("/store/collections", {
      query: queryParams,
    })
    .then(({ collections }) => ({ collections, count: collections.length }));
};

export const getCollectionByHandle = async (handle: string): Promise<HttpTypes.StoreCollection> => {
  return sdk.client
    .fetch<HttpTypes.StoreCollectionListResponse>(`/store/collections`, {
      query: { handle, fields: "*products" },
    })
    .then(({ collections }) => collections[0]);
};
