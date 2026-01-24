import { Link, useNavigate } from "react-router";
import type { MetaFunction } from "react-router";

import { Heading, Paragraph } from "@/components/ui/text";

import { RegisterForm } from "@/modules/customer/register-form";

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
  const navigate = useNavigate();

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
        <RegisterForm onSuccess={() => navigate("/account")} />
      </div>

      <div className="text-center">
        <Paragraph className="text-muted-foreground text-sm">
          Already have an account?{" "}
          <Link className="link inline-flex!" to="/auth/login">
            Sign in
          </Link>
        </Paragraph>
      </div>
    </>
  );
}
