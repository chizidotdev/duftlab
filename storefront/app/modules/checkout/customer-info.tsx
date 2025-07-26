import { type UseFormReturn } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Heading } from "@/components/ui/text";

import { cn } from "@/lib/utils";

import type { CheckoutFormSchemaType } from "./checkout-form-schema";

export function CustomerInfo({ form }: { form: UseFormReturn<CheckoutFormSchemaType> }) {
  return (
    <>
      <div className="flex flex-col gap-3">
        <Heading variant="h3">Customer Info</Heading>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Heading className="sm:col-span-2" variant="h3">
          Shipping Address
        </Heading>
        {addressFormFields.map((item) => (
          <FormField
            key={item.key}
            control={form.control}
            name={`shipping_address.${item.key}` as const}
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
