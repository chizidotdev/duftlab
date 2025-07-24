import { Link, redirect } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import type { HttpTypes } from "@medusajs/types";
import { LockIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AppLogo } from "@/components/app-logo";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Paragraph } from "@/components/ui/text";

import { useGetCart } from "@/hooks/data";
import { useShippingAddress } from "@/hooks/data";
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
import { Summary } from "@/modules/checkout/summary";

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

  if (!cart?.region?.id) {
    throw redirect("/");
  }

  return { cart, shippingMethods };
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Checkout - Duftlab" }];
}

export default function CheckoutPage({ loaderData }: Route.ComponentProps) {
  const { data: cart } = useGetCart(loaderData.cart as HttpTypes.StoreCart);

  const { mutate, isPending } = useShippingAddress();
  const form = useForm<CheckoutFormSchemaType>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: cart?.email,
      first_name: cart?.shipping_address?.first_name,
      last_name: cart?.shipping_address?.last_name,
      address_1: cart?.shipping_address?.address_1,
      postal_code: cart?.shipping_address?.postal_code,
      city: cart?.shipping_address?.city,
      province: cart?.shipping_address?.province,
      country_code: DEFAULT_COUNTRY_CODE,
      phone: cart?.shipping_address?.phone,
      same_as_billing: true,
      shipping_method: cart?.shipping_methods?.[0]?.shipping_option_id,
    },
  });

  function onSubmit(values: CheckoutFormSchemaType) {
    const { same_as_billing, shipping_method, email, ...shipping_address } = values;

    mutate(
      { email, shipping_address, same_as_billing },
      {
        onSuccess: async (response) => {
          const cart = (await response.json()) as HttpTypes.StoreCart;

          const paymentSession = cart?.payment_collection?.payment_sessions?.[0];
          const authUrl = paymentSession?.data.paystackTxAuthorizationUrl as string;

          if (!authUrl) toast.error("An error occured while initiating payment. Please try again");

          window.open(authUrl, "_self");
        },
      }
    );
  }

  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="mx-auto w-full max-w-lg py-6 lg:mr-0">
        <section className="container space-y-6 pb-3">
          <Link to="/" className="mx-auto block w-fit">
            <AppLogo className="text-2xl" />
          </Link>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <ShippingAddress form={form} />
              <ShippingMethod
                form={form}
                cart={cart}
                shippingOptions={loaderData.shippingMethods}
              />
              <Payment form={form} />

              <div className="space-y-3">
                <Button isLoading={isPending} className="col-span-2 mt-2 w-full">
                  Continue to payment
                </Button>
                <div className="flex items-center justify-between gap-3">
                  <Paragraph className="text-muted-foreground flex items-center gap-1 text-sm">
                    <LockIcon className="size-3" />
                    &nbsp;Secured by Paystack
                  </Paragraph>
                  <PaymentProviders />
                </div>
              </div>
            </form>
          </Form>
        </section>
      </div>

      <div className="bg-muted sticky top-0 h-fit border-l lg:min-h-dvh">
        <section className="container">
          <Summary cart={cart} />
        </section>
      </div>
    </div>
  );
}
