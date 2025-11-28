import { Link, href } from "react-router";
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

import { useAuthLogin } from "@/hooks/data";

const loginSchema = z.object({ email: z.email(), password: z.string() });

export const meta: MetaFunction = () => {
  return [
    { title: "Sign In - Duftlab" },
    {
      name: "description",
      content:
        "Sign in to your Duftlab account to track orders and manage your fragrance preferences.",
    },
  ];
};

export default function Login() {
  const { mutate, isPending } = useAuthLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  function onLogin(values: z.infer<typeof loginSchema>) {
    mutate(values);
  }

  return (
    <>
      <hgroup className="flex flex-col items-center text-center">
        <Heading className="mt-4" variant="h2">
          Welcome back
        </Heading>
        <Paragraph className="text-muted-foreground">Enter your email to continue.</Paragraph>
      </hgroup>

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onLogin)} className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input autoFocus type="email" placeholder="Enter your email" {...field} />
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
                  <div className="flex items-center justify-between gap-2">
                    <FormLabel>Password</FormLabel>
                    <Link className="link" to={href("/auth/reset-password")}>
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button isLoading={isPending} className="mt-2 w-full">
              Continue with password
            </Button>
          </form>
        </Form>
      </div>

      <div className="text-center">
        <Paragraph className="text-muted-foreground text-sm">
          Don't have an account?{" "}
          <Link className="link inline-flex!" to={href("/auth/register")}>
            Register
          </Link>
        </Paragraph>
      </div>
    </>
  );
}
