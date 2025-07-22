import { Link, redirect } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import type { HttpTypes } from "@medusajs/types";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Heading } from "@/components/ui/text";

import { useGetCart, useShippingAddress } from "@/hooks/data";
import { DEFAULT_COUNTRY_CODE } from "@/lib/constants";
import { retrieveCart } from "@/lib/data/cart";
import { getCartId } from "@/lib/data/cookies";
import { listCartShippingMethods } from "@/lib/data/fulfillment";
import {
  type CheckoutFormSchemaType,
  checkoutFormSchema,
} from "@/modules/checkout/checkout-form-schema";
import { Payment } from "@/modules/checkout/payment";
import { PaymentProviders } from "@/modules/checkout/payment-providers";
import { ShippingAddress } from "@/modules/checkout/shipping-address";
import { ShippingMethod } from "@/modules/checkout/shipping-method";

import type { Route } from "./+types/checkout";

export async function loader({ request }: Route.LoaderArgs) {
  const cartId = getCartId(request);
  if (!cartId) {
    throw redirect("/");
  }

  const [cart, shippingMethods] = await Promise.all([
    retrieveCart(request, cartId),
    listCartShippingMethods(request, cartId),
  ]);

  return { cart, shippingMethods };
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Checkout - Duftlab" }];
}

export default function CheckoutPage({ loaderData }: Route.ComponentProps) {
  const { data } = useGetCart(loaderData.cart as HttpTypes.StoreCart);

  const { mutate, isPending } = useShippingAddress();
  const form = useForm<CheckoutFormSchemaType>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: data?.email,
      first_name: data?.shipping_address?.first_name,
      last_name: data?.shipping_address?.last_name,
      address_1: data?.shipping_address?.address_1,
      postal_code: data?.shipping_address?.postal_code,
      city: data?.shipping_address?.city,
      province: data?.shipping_address?.province,
      country_code: DEFAULT_COUNTRY_CODE,
      phone: data?.shipping_address?.phone,
      same_as_billing: true,
      shipping_method: data?.shipping_methods?.[0]?.shipping_option_id,
    },
  });

  function onSubmit(values: CheckoutFormSchemaType) {
    const { same_as_billing, shipping_method, email, ...shipping_address } = values;
    mutate({ email, shipping_address, same_as_billing });
  }

  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="ml-auto w-full max-w-lg py-6">
        <section className="container">
          <Button asChild variant="outline">
            <Link to="/">Back to store</Link>
          </Button>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 py-6">
              <ShippingAddress form={form} />
              <ShippingMethod
                form={form}
                cart={data}
                shippingOptions={loaderData.shippingMethods}
              />
              <Payment form={form} />

              <Button isLoading={isPending} className="col-span-2 mt-2 w-full">
                Continue to payment
              </Button>
              <PaymentProviders />
            </form>
          </Form>
        </section>
      </div>

      <div className="bg-muted min-h-60">
        <div className="container mr-auto w-full max-w-screen-sm py-6">
          <Heading variant="h2">Summary</Heading>
        </div>
      </div>
    </div>
  );
}
