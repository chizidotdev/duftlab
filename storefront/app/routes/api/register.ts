import { signup } from "@/lib/data/customer";

import type { Route } from "./+types/register";

export async function action({ request }: Route.ActionArgs) {
  const { email, password, first_name, last_name } = await request.json();

  const headers = new Headers();
  await signup(request, { email, password, first_name, last_name }, headers);

  return Response.json({ message: "Success" }, { headers });
}
