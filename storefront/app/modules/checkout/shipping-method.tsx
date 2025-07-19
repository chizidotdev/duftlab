import type { UseFormReturn } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Heading } from "@/components/ui/text";

import type { CheckoutFormSchemaType } from "./checkout-form-schema";

export function ShippingMethod({ form }: { form: UseFormReturn<CheckoutFormSchemaType> }) {
  const options = [
    { key: "one", label: "Option One" },
    { key: "two", label: "Option Two" },
  ];

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
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="gap-0 rounded border"
              >
                {options.map((option) => (
                  <FormLabel className="has-data-[state=checked]:bg-muted flex h-10 items-center gap-2 px-3 py-1 not-last:border-b">
                    <FormControl>
                      <RadioGroupItem value={option.key} id={option.key} />
                    </FormControl>
                    <span>{option.label}</span>
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
