import { BigNumberValue, OrderDTO } from "@medusajs/framework/types";
import { Heading, Img, Section } from "@react-email/components";
import Cart from "./components/cart";
import EmailBody from "./components/email-body";
import Layout from "./components/layout";
import CustomerInformation from "./components/shipping-address";
import { title } from "./components/style";
import { convertToLocale } from "./utils";

export default function OrderConfirmation({ order }: { order: OrderDTO }) {
  const convertMoney = (amount: BigNumberValue) => {
    return convertToLocale({
      // @ts-ignore
      amount,
      currency_code: order.currency_code,
    });
  };

  return (
    <Layout preview="Order confirmation - Duftlab">
      <Section className="w-full px-5 mt-5 mb-12" align="left">
        <Img
          className="max-w-[200px] mb-20"
          src="https://duftlab.com/logo-mark.png"
        />
        <Heading className="pb-3" style={title}>
          Thank you for your fragrance order!
        </Heading>
        <EmailBody
          paragraphs={[
            "Thank you for choosing Duftlab for your fragrance needs! We've received your order and are carefully preparing your authentic fragrances with special care to ensure they arrive in perfect condition.",
            "Your fragrances will be securely packaged to preserve their quality during shipping.",
          ]}
        />
        <Cart
          currency_code={order.currency_code}
          items={order.items}
          date={new Date(order.created_at).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
          details={{
            subtotal: convertMoney(order.item_subtotal),
            discount: convertMoney(order.discount_total),
            shipping: convertMoney(order.shipping_total),
            taxes: convertMoney(order.tax_total),
            total: convertMoney(order.total),
          }}
        />
        <CustomerInformation
          method={order.shipping_methods?.[0]?.name}
          shippingAddress={order.shipping_address}
          billingAddress={order.billing_address}
        />
      </Section>
    </Layout>
  );
}
