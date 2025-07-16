import { CACHE_HEADERS } from "@/lib/constants";

import type { Route } from "./+types/home";

export async function loader({ request }: Route.LoaderArgs) {}

export function headers() {
  return CACHE_HEADERS;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <></>;
}
