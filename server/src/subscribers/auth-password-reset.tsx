import { SubscriberArgs, type SubscriberConfig } from "@medusajs/medusa";
import { ResetPasswordEmail } from "../api/store/email/_templates/password-reset";
import { sendEmail } from "../api/store/email/lib";

export default async function resetPasswordTokenHandler({
  event: {
    data: { entity_id: email, token, actor_type },
  },
}: SubscriberArgs<{ entity_id: string; token: string; actor_type: string }>) {
  const urlPrefix =
    actor_type === "customer"
      ? "https://duftlab.com/auth"
      : "https://server.duftlab.com/app";

  sendEmail({
    to: email,
    subject: "Reset Your Duftlab Password",
    react: (
      <ResetPasswordEmail
        resetPasswordLink={`${urlPrefix}/reset-password?token=${token}&email=${email}`}
      />
    ),
  });
}

export const config: SubscriberConfig = {
  event: "auth.password_reset",
};
