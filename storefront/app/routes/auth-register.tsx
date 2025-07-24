import { Link } from "react-router";
import type { MetaFunction } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, PasswordInput } from "@/components/ui/input";
import { Heading, Paragraph } from "@/components/ui/text";

import { useAuthRegister } from "@/hooks/data";

const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
});

export const meta: MetaFunction = () => {
  return [
    { title: "Create Account - Duftlab" },
    {
      name: "description",
      content:
        "Join Duftlab to enjoy faster checkout, order tracking, and personalized fragrance recommendations.",
    },
  ];
};

export default function Register() {
  const { mutate: register, isPending: isRegistering } = useAuthRegister();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "", first_name: "", last_name: "" },
  });

  function onRegister(values: z.infer<typeof registerSchema>) {
    register(values);
  }

  return (
    <>
      <hgroup className="flex flex-col items-center text-center">
        <Heading className="mt-4" variant="h2">
          Create an account
        </Heading>
        <Paragraph className="text-muted-foreground">
          Register for faster checkout, track your order's status, and more.
        </Paragraph>
      </hgroup>

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onRegister)} className="grid gap-2">
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Minimum 8 characters" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button isLoading={isRegistering} className="mt-2 w-full">
              Create Account
            </Button>
          </form>
        </Form>
      </div>

      <div className="text-center">
        <Paragraph className="text-muted-foreground text-sm">
          Already have an account?{" "}
          <Link className="link" to="/auth/login">
            Sign in
          </Link>
        </Paragraph>
      </div>
    </>
  );
}
