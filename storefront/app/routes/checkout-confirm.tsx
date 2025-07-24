import { Link, data } from "react-router";

import { CheckCircle2, Package } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading, Paragraph } from "@/components/ui/text";

import { removeCartId } from "@/lib/data/cookies";

export function loader() {
  const headers = new Headers();
  removeCartId(headers);

  return data({}, { headers });
}

export default function VerifyPaymentPage() {
  /* const [searchParams] = useSearchParams();
  const trxref = searchParams.get("trxref");
  const reference = searchParams.get("reference"); */

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-green-100 p-4">
            <CheckCircle2 className="size-12 text-green-600" />
          </div>
        </div>

        <Heading variant="h2" className="mb-4">
          Order Placed Successfully!
        </Heading>

        <Paragraph className="mb-8">
          Thank you for your order. You will receive an email confirmation shortly with your order
          details.
        </Paragraph>

        <Button asChild className="mb-4 w-full">
          <Link to="/collections/all">
            <Package />
            Continue Shopping
          </Link>
        </Button>

        <Paragraph className="text-muted-foreground text-sm">
          Need help? Contact our support team.
        </Paragraph>
      </div>
    </div>
  );
}
