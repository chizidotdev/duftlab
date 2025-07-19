import { Link } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Heading } from "@/components/ui/text";

import { useCheckoutAddress } from "@/hooks/data";
import {
  type CheckoutFormSchemaType,
  checkoutFormSchema,
} from "@/modules/checkout/checkout-form-schema";
import { Payment } from "@/modules/checkout/payment";
import { PaymentProviders } from "@/modules/checkout/payment-providers";
import { ShippingAddress } from "@/modules/checkout/shipping-address";
import { ShippingMethod } from "@/modules/checkout/shipping-method";

import type { Route } from "./+types/checkout";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Checkout - Duftlab" }];
}

export default function CheckoutPage() {
  const { mutate, isPending } = useCheckoutAddress();
  const form = useForm<CheckoutFormSchemaType>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      address_1: "",
      postal_code: "",
      city: "",
      province: "",
      country_code: "",
      phone: "",
    },
  });

  function onSubmit(values: CheckoutFormSchemaType) {
    mutate(values);
  }

  return (
    <div className="grid min-h-dvh px-3 lg:grid-cols-2">
      <div className="ml-auto w-full max-w-lg py-6">
        <Button asChild variant="outline">
          <Link to="/">Back to store</Link>
        </Button>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="container flex flex-col gap-6 py-6"
          >
            <ShippingAddress form={form} />
            <ShippingMethod form={form} />
            <Payment form={form} />

            <Button isLoading={isPending} className="col-span-2 mt-2 w-full">
              Continue to payment
            </Button>
            <PaymentProviders />
          </form>
        </Form>
      </div>

      <div className="bg-muted container mr-auto w-full max-w-screen-sm py-6">
        <Heading variant="h2">Summary</Heading>
      </div>
    </div>
  );
}
