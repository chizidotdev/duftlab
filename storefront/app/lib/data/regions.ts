import { HttpTypes } from "@medusajs/types";

import { sdk } from "@/lib/config";
import medusaError from "@/lib/utils/medusa-error";

import { DEFAULT_COUNTRY_CODE } from "../constants";

export const listRegions = async () => {
  return sdk.client
    .fetch<{ regions: HttpTypes.StoreRegion[] }>(`/store/regions`, {
      method: "GET",
    })
    .then(({ regions }) => regions)
    .catch(medusaError);
};

export const retrieveRegion = async (id: string) => {
  return sdk.client
    .fetch<{ region: HttpTypes.StoreRegion }>(`/store/regions/${id}`, {
      method: "GET",
    })
    .then(({ region }) => region)
    .catch(medusaError);
};

const regionMap = new Map<string, HttpTypes.StoreRegion>();

export const getRegion = async (countryCode: string = DEFAULT_COUNTRY_CODE) => {
  try {
    if (regionMap.has(countryCode)) {
      return regionMap.get(countryCode);
    }

    const regions = await listRegions();

    if (!regions) {
      return null;
    }

    regions.forEach((region) => {
      region.countries?.forEach((c) => {
        regionMap.set(c?.iso_2 ?? "", region);
      });
    });

    const region = countryCode ? regionMap.get(countryCode) : regionMap.get("us");

    return region;
  } catch (e: any) {
    return null;
  }
};
