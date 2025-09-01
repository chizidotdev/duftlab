import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
// import { Modules } from "@medusajs/framework/utils";
// import { Resend } from "resend";

export default async function subscribeNewsletterHandler({
  event,
  // container,
}: SubscriberArgs<{ id: string }>) {
  try {
    /* const customerModuleService = container.resolve(Modules.CUSTOMER);
    const customer = await customerModuleService.retrieveCustomer(
      event.data.id,
    );

    const resend = new Resend(process.env.RESEND_API_KEY);
    const resendAudienceId = process.env.RESEND_AUDIENCE_ID;
    if (!resendAudienceId) throw new Error("No audience found");

    const { error } = await resend.contacts.create({
      audienceId: resendAudienceId,
      email: customer.email,
    });

    if (error) throw new Error("Error subscribing email"); */

    const response = await fetch(
      "https://server.duftlab.com/store/email/welcome/" + event.data.id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-publishable-api-key": process.env.MEDUSA_PUBLISHABLE_KEY,
        },
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export const config: SubscriberConfig = {
  event: ["customer.created", "customer.updated"],
};
