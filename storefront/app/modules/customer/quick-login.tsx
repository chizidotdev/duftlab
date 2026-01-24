import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Paragraph } from "@/components/ui/text";

import { LoginForm } from "@/modules/customer/login-form";
import { RegisterForm } from "@/modules/customer/register-form";

export function QuickLogin() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <>
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogTrigger className="link text-left text-sm">
          Sign in to save 5% on your order
        </DialogTrigger>
        <DialogContent>
          <hgroup className="flex flex-col items-center text-center">
            <DialogTitle>Welcome back</DialogTitle>
            <DialogDescription>Enter your email to continue.</DialogDescription>
          </hgroup>

          <LoginForm onSuccess={() => window.location.reload()} />

          <div className="mt-2 text-center">
            <Paragraph className="text-muted-foreground text-sm">
              Don't have an account?{" "}
              <button
                className="link inline-flex!"
                onClick={() => {
                  setLoginOpen(false);
                  setRegisterOpen(true);
                }}
              >
                Register
              </button>
            </Paragraph>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
        <DialogContent>
          <hgroup className="flex flex-col items-center text-center">
            <DialogTitle>Create an account</DialogTitle>
            <DialogDescription>Sign up to save 5% on your order.</DialogDescription>
          </hgroup>

          <RegisterForm onSuccess={() => window.location.reload()} />

          <div className="mt-2 text-center">
            <Paragraph className="text-muted-foreground text-sm">
              Already have an account?{" "}
              <button
                className="link inline-flex!"
                onClick={() => {
                  setRegisterOpen(false);
                  setLoginOpen(true);
                }}
              >
                Sign in
              </button>
            </Paragraph>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
