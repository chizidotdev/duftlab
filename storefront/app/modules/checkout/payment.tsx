import type { UseFormReturn } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Heading, Paragraph } from "@/components/ui/text";

import { cn } from "@/lib/utils";

import type { CheckoutFormSchemaType } from "./checkout-form-schema";

export function Payment({ form }: { form: UseFormReturn<CheckoutFormSchemaType> }) {
  return (
    <>
      <div className="space-y-3">
        <div>
          <Heading variant="h3">Payment</Heading>
          <Paragraph className="text-muted-foreground">
            All transactions are secure and encrypted.
          </Paragraph>
        </div>

        <FormField
          control={form.control}
          name="same_as_billing"
          render={({ field }) => {
            return (
              <FormItem className="flex flex-row items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      if (checked) form.setValue("billing_address", undefined);
                    }}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Use shipping address as billing address
                </FormLabel>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </div>

      {!form.watch("same_as_billing") && (
        <div className="grid gap-3 sm:grid-cols-2">
          <Heading className="sm:col-span-2" variant="h3">
            Billing Address
          </Heading>
          {addressFormFields.map((item) => (
            <FormField
              key={item.key}
              control={form.control}
              name={`billing_address.${item.key}` as const}
              render={({ field }) => (
                <FormItem className={cn(item.className)}>
                  <FormLabel>{item.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={item.placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
      )}
    </>
  );
}

const addressFormFields: {
  label: string;
  placeholder: string;
  key: keyof CheckoutFormSchemaType["shipping_address"];
  className?: string;
}[] = [
  { label: "First name", placeholder: "Enter your first name", key: "first_name" },
  { label: "Last name", placeholder: "Enter your last name", key: "last_name" },
  {
    label: "Address",
    placeholder: "Enter your address",
    key: "address_1",
    className: "sm:col-span-2",
  },
  { label: "Postal code", placeholder: "Enter postal code", key: "postal_code" },
  { label: "City", placeholder: "Enter city", key: "city" },
  { label: "State", placeholder: "Enter state", key: "province" },
  { label: "Phone", placeholder: "Enter phone number", key: "phone" },
];
