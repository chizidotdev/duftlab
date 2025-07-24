import type { HttpTypes } from "@medusajs/types";
import type { UseFormReturn } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Heading } from "@/components/ui/text";

import { useShippingMethod } from "@/hooks/data";
import { convertToLocale } from "@/lib/utils/money";

import type { CheckoutFormSchemaType } from "./checkout-form-schema";

export function ShippingMethod({
  form,
  cart,
  shippingOptions,
}: {
  form: UseFormReturn<CheckoutFormSchemaType>;
  cart: HttpTypes.StoreCart | null;
  shippingOptions: HttpTypes.StoreCartShippingOption[] | null;
}) {
  const { mutate } = useShippingMethod();

  if (!cart || !shippingOptions) return null;

  return (
    <div className="flex flex-col gap-3">
      <Heading variant="h3">Shipping Method</Heading>

      <FormField
        control={form.control}
        name="shipping_method"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RadioGroup
                onValueChange={(v) => {
                  field.onChange(v);
                  mutate(v);
                }}
                defaultValue={field.value}
                className="gap-0 rounded border"
              >
                {shippingOptions?.map((option) => (
                  <FormLabel
                    key={option.id}
                    className="has-data-[state=checked]:bg-muted flex min-h-12 items-center gap-2 px-3 py-3 not-last:border-b"
                  >
                    <FormControl>
                      <RadioGroupItem value={option.id} id={option.id} />
                    </FormControl>
                    <span>{option.name} </span>
                    <span className="ml-auto flex">
                      {convertToLocale({
                        amount: option.prices[0].amount,
                        currency_code: cart.currency_code,
                      })}
                    </span>
                  </FormLabel>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
