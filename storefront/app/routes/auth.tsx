import { Outlet, redirect } from "react-router";

import { CACHE_HEADERS } from "@/lib/constants";
import { retrieveCustomer } from "@/lib/data/customer";

import type { Route } from "./+types/auth";

export async function loader({ request }: Route.LoaderArgs) {
  const customer = await retrieveCustomer(request);
  if (!!customer) throw redirect("/account");

  return {};
}

export function headers() {
  return CACHE_HEADERS;
}

export default function AuthLayout() {
  return (
    <div className="mx-auto grid w-full max-w-md place-items-center">
      <div className="bg-card w-full space-y-8 rounded-md pt-20 pb-24 sm:px-10">
        <Outlet />
      </div>
    </div>
  );
}
