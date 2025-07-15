import { Button } from "@/components/ui/button";
import { Heading, Paragraph } from "@/components/ui/text";

import { addToCart, getOrSetCart } from "@/lib/data/cart";
import { convertToLocale } from "@/lib/utils/money";

import type { Route } from "./+types/cart";

export async function action({ request }: Route.ActionArgs) {
  const data = await request.json();

  const headers = new Headers();
  await addToCart(request, {
    variantId: data.variantId,
    quantity: data.quantity,
    responseHeaders: headers,
  });

  return Response.json({ message: "Success" }, { headers });
}

export async function loader({ request }: Route.LoaderArgs) {
  const cart = await getOrSetCart(request);
  // const customer = await retrieveCustomer(request);
  if (!cart) throw new Error("Cart not found");

  return { cart };
}

export default function Cart({ loaderData }: Route.ComponentProps) {
  const { cart } = loaderData;

  const cartItems = cart.items ?? [];

  return (
    <div className="space-y-10">
      <Heading variant="h2">Cart</Heading>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id}>
            <Paragraph>
              {item.title} <span className="text-muted-foreground">({item.variant?.title})</span>
            </Paragraph>
            <div className="flex gap-2">
              <Paragraph>{item.quantity}x</Paragraph>
              <Paragraph>
                {convertToLocale({ amount: item.unit_price, currency_code: cart.currency_code })}
              </Paragraph>
            </div>
            <Paragraph>
              {convertToLocale({ amount: item.total, currency_code: cart.currency_code })}
            </Paragraph>
          </div>
        ))}
      </div>

      <Button>Checkout</Button>
    </div>
  );
}
