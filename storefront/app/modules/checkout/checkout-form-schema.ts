import z from "zod";

const addressSchema = z.object({
  first_name: z.string("Invalid input").min(3, "Invalid input"),
  last_name: z.string("Invalid input").min(3, "Invalid input"),
  address_1: z.string("Invalid input").min(3, "Invalid input"),
  postal_code: z.string("Invalid input").min(3, "Invalid input"),
  city: z.string("Invalid input").min(3, "Invalid input"),
  province: z.string("Invalid input").min(3, "Invalid input"),
  country_code: z.string("Invalid input"),
  phone: z.string("Invalid input").min(3, "Invalid input"),
});

export const checkoutFormSchema = z
  .object({
    email: z.email(),
    shipping_address: addressSchema,
    billing_address: addressSchema.optional(),

    shipping_method: z.string("Invalid input").min(3, "Invalid input"),
    same_as_billing: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.same_as_billing) return !data.billing_address;
      return !!data.billing_address;
    },
    { message: "Billing address is required when not using shipping address as billing address" }
  );

export type CheckoutFormSchemaType = z.infer<typeof checkoutFormSchema>;
