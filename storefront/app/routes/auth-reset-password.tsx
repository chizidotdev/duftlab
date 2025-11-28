import { Link, href, useSearchParams } from "react-router";
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

import { usePasswordResetConfirm, usePasswordResetRequest } from "@/hooks/data";

export const meta: MetaFunction = () => {
  return [
    { title: "Reset Password - Duftlab" },
    { name: "description", content: "Reset your Duftlab account password." },
  ];
};

const TOKEN_KEY = "token";
const EMAIL_KEY = "email";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get(TOKEN_KEY);
  const email = searchParams.get(EMAIL_KEY);

  if (!token || !email) {
    return <ResetPasswordRequest />;
  }

  return <ResetPasswordConfirm token={token} email={email} />;
}

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

function ResetPasswordConfirm({ token, email }: { token: string; email: string }) {
  const { mutate, isPending, isError } = usePasswordResetConfirm();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    mutate({ email, password: values.password, token });
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-4">
        <hgroup className="flex flex-col items-center text-center">
          <Heading className="mt-4" variant="h2">
            Your reset link is invalid
          </Heading>
          <Paragraph className="text-muted-foreground">
            Please request a new password reset link.
          </Paragraph>
        </hgroup>

        <Button asChild>
          <Link to={href("/auth/reset-password")}>Go to Reset Password</Link>
        </Button>

        <Link className="link" to={href("/auth/login")}>
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <>
      <hgroup className="flex flex-col items-center text-center">
        <Heading className="mt-4" variant="h2">
          Reset your password
        </Heading>
        <Paragraph className="text-muted-foreground">Enter your new password below.</Paragraph>
      </hgroup>

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput autoFocus placeholder="Enter your new password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Confirm your new password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button isLoading={isPending} className="mt-2 w-full">
              Reset Password
            </Button>
          </form>
        </Form>
      </div>

      <Link className="link mx-auto w-fit" to={href("/auth/login")}>
        Back to login
      </Link>
    </>
  );
}

const passwordResetRequestSchema = z.object({ email: z.email("Invalid email address") });

export function ResetPasswordRequest() {
  const { mutate, isPending } = usePasswordResetRequest();

  const form = useForm<{ email: string }>({
    resolver: zodResolver(passwordResetRequestSchema),
    defaultValues: { email: "" },
  });

  function onSubmit(values: z.infer<typeof passwordResetRequestSchema>) {
    mutate(values);
  }

  return (
    <>
      <hgroup className="flex flex-col items-center text-center">
        <Heading className="mt-4" variant="h2">
          Forgot your password?
        </Heading>
        <Paragraph className="text-muted-foreground">
          Enter your email address below and we'll send you a link to reset your password.
        </Paragraph>
      </hgroup>

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
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

            <Button isLoading={isPending} className="mt-2 w-full">
              Send Reset Link
            </Button>
          </form>
        </Form>
      </div>

      <Link className="link mx-auto w-fit" to={href("/auth/login")}>
        Back to login
      </Link>
    </>
  );
}
