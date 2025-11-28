import { confirmPasswordReset, resetPassword } from "@/lib/data/customer";

import type { Route } from "./+types/password-reset";

export async function action({ request }: Route.ActionArgs) {
  const { email, password, token } = await request.json();

  if (!!email && !!password && !!token) {
    const result = await confirmPasswordReset(email, password, token);

    if (result && typeof result === "object" && "success" in result && result.success) {
      return Response.json({ message: "Password reset successfully" });
    }

    return Response.json({ error: "Failed to reset password" }, { status: 400 });
  }

  if (!!email) {
    const result = await resetPassword(email);
    if (result && typeof result === "object" && "success" in result && result.success) {
      return Response.json({ message: `Password reset email sent to ${email}` });
    }

    return Response.json({ error: "Failed to send password reset email" }, { status: 400 });
  }

  return Response.json({ error: "Email are required" }, { status: 400 });
}
