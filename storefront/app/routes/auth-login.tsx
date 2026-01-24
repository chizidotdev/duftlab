import { Link, href, useNavigate } from "react-router";
import type { MetaFunction } from "react-router";


import { Heading, Paragraph } from "@/components/ui/text";

import { LoginForm } from "@/modules/customer/login-form";

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
  const navigate = useNavigate();

  return (
    <>
      <hgroup className="flex flex-col items-center text-center">
        <Heading className="mt-4" variant="h2">
          Welcome back
        </Heading>
        <Paragraph className="text-muted-foreground">Enter your email to continue.</Paragraph>
      </hgroup>

      <LoginForm onSuccess={() => navigate("/account")} />

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
