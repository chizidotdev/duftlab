import z from "zod";

export type CheckoutFormSchemaType = z.infer<typeof checkoutFormSchema>;
export const checkoutFormSchema = z.object({
  email: z.string().min(3),
  first_name: z.string().min(3),
  last_name: z.string().min(3),
  address_1: z.string().min(3),
  postal_code: z.string().min(3),
  city: z.string().min(3),
  province: z.string().min(3),
  country_code: z.string().min(3).optional(),
  phone: z.string().min(3),

  shipping_method: z.string().min(3),
  same_as_billing: z.boolean().optional(),
});
