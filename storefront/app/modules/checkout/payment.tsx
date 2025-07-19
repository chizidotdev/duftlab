import type { UseFormReturn } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Heading, Paragraph } from "@/components/ui/text";

import type { CheckoutFormSchemaType } from "./checkout-form-schema";

export function Payment({ form }: { form: UseFormReturn<CheckoutFormSchemaType> }) {
  return (
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
                  onCheckedChange={(checked) => field.onChange(checked)}
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
  );
}
