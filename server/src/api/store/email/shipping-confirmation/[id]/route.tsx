import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { Modules } from "@medusajs/framework/utils";
import ShippingConfirmation from "../../_templates/shipping-confirmation";
import { sendEmail } from "../../lib";

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { id } = req.params;

  const orderService = req.scope.resolve(Modules.ORDER);
  const order = await orderService.retrieveOrder(id, {
    select: ["email"],
  });

  if (!order || !order.email) {
    return res.status(404).json({ message: "Order not found" });
  }

  try {
    await sendEmail({
      to: order.email,
      subject: "Your Duftlab Fragrances Have Shipped! 🚚✨",
      react: <ShippingConfirmation />,
    });

    res.json({ message: "Shipping confirmation email sent successfully!" });
  } catch (e) {
    console.error("Shipping confirmation email failed:", e);
    res
      .status(500)
      .json({ message: "Failed to send shipping confirmation email" });
  }
}
