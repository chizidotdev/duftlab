import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { Modules } from "@medusajs/framework/utils";
import OrderConfirmation from "../../_templates/order-confirmation";
import { sendEmail } from "../../lib";

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { id } = req.params;

  const orderService = req.scope.resolve(Modules.ORDER);

  const order = await orderService.retrieveOrder(id, {
    relations: [
      "items",
      "shipping_methods",
      "shipping_address",
      "billing_address",
      "summary",
    ],
    select: [
      "email",
      "total",
      "item_subtotal",
      "discount_total",
      "shipping_total",
      "currency_code",
    ],
  });

  if (!order || !order.email) {
    return res.status(404).json({ message: "Order not found" });
  }

  try {
    await sendEmail({
      to: order.email,
      subject:
        "Your Duftlab Order Confirmation - You're About To Smell Really Good!",
      react: <OrderConfirmation order={order} />,
    });

    res.json({ message: "Order confirmation email sent successfully!" });
  } catch (e) {
    console.error("Order confirmation email failed:", e);
    res
      .status(500)
      .json({ message: "Failed to send order confirmation email" });
  }
}
