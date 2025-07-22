import z from "zod";

export type CheckoutFormSchemaType = z.infer<typeof checkoutFormSchema>;
export const checkoutFormSchema = z.object({
  email: z.email(),
  first_name: z.string("Invalid input").min(3, "Invalid input"),
  last_name: z.string("Invalid input").min(3, "Invalid input"),
  address_1: z.string("Invalid input").min(3, "Invalid input"),
  postal_code: z.string("Invalid input").min(3, "Invalid input"),
  city: z.string("Invalid input").min(3, "Invalid input"),
  province: z.string("Invalid input").min(3, "Invalid input"),
  country_code: z.string("Invalid input"),
  phone: z.string("Invalid input").min(3, "Invalid input"),

  shipping_method: z.string("Invalid input").min(3, "Invalid input"),
  same_as_billing: z.boolean().optional(),
});
