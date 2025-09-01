import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { Modules } from "@medusajs/framework/utils";
import Welcome from "../../_templates/welcome";
import { sendEmail } from "../../lib";

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { id } = req.params;

  const customerService = req.scope.resolve(Modules.CUSTOMER);
  const productService = req.scope.resolve(Modules.PRODUCT);

  const customer = await customerService.retrieveCustomer(id);
  const products = await productService.listProducts({}, { take: 3 });

  try {
    await sendEmail({
      to: customer.email,
      subject: "Welcome to Duftlab - Your Fragrance Journey Begins! ✨",
      react: <Welcome products={products} />,
    });

    res.json({ message: "Welcome email sent successfully!" });
  } catch (e) {
    console.error("Welcome email failed:", e);
    res.status(500).json({ message: "Failed to send welcome email" });
  }
}
