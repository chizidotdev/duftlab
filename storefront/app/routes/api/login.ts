import { login } from "@/lib/data/customer";

import type { Route } from "./+types/login";

export async function action({ request }: Route.ActionArgs) {
  const { email, password } = await request.json();

  const headers = new Headers();
  await login(request, { email, password }, headers);

  return Response.json({ message: "Success" }, { headers });
}
