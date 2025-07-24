import { NavLink, redirect } from "react-router";
import type { MetaFunction } from "react-router";

import { Building2, ExternalLink, Mail, MapPin, Phone, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heading, Paragraph } from "@/components/ui/text";

import { CACHE_HEADERS } from "@/lib/constants";
import { retrieveCustomer } from "@/lib/data/customer";
import { formatDate } from "@/lib/utils/date";

import type { Route } from "./+types/account";

export async function loader({ request }: Route.LoaderArgs) {
  const customer = await retrieveCustomer(request);

  if (!customer) {
    throw redirect("/auth/login");
  }

  return { customer };
}

export function headers() {
  return CACHE_HEADERS;
}

export const meta: MetaFunction = () => {
  return [
    { title: "My Account - Duftlab" },
    {
      name: "description",
      content: "Manage your account, view order history, and update your fragrance preferences.",
    },
  ];
};

export default function Account({ loaderData }: Route.ComponentProps) {
  const { customer } = loaderData;

  const profileInfo = [
    {
      title: "Full Name",
      value:
        customer.first_name && customer.last_name
          ? `${customer.first_name} ${customer.last_name}`
          : "-",
      icon: UserRound,
    },
    {
      title: "Email Address",
      value: customer.email,
      icon: Mail,
    },
    {
      title: "Phone Number",
      value: customer.phone ? customer.phone : "-",
      icon: Phone,
    },
    {
      title: "Company",
      value: customer.company_name,
      icon: Building2,
      hidden: !customer.phone,
    },
  ];

  const accountDetails = [
    {
      title: "Customer ID",
      value: customer.id,
      className: "font-mono text-sm",
    },
    {
      title: "Member Since",
      value: customer.created_at ? formatDate(customer.created_at) : "Unknown",
      className: "text-sm",
    },
  ];

  return (
    <div className="mx-auto max-w-screen-xl space-y-10">
      <hgroup className="flex flex-wrap justify-between gap-6">
        <div>
          <Heading variant="h2">Hello {customer.first_name || customer.email}</Heading>
          <Paragraph className="text-muted-foreground">
            Manage your account information and view your order history.
          </Paragraph>
        </div>

        <NavLink to="/account/orders" className="link">
          <ExternalLink className="size-3.5" />
          View Order History
        </NavLink>
      </hgroup>

      <section className="grid gap-10 lg:grid-cols-2">
        {/* Personal Information */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <Heading variant="h3">Personal Information</Heading>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>

          <div className="space-y-4">
            {profileInfo.map(
              (info) =>
                !info.hidden && (
                  <div key={info.title} className="flex items-center gap-3">
                    <info.icon className="text-muted-foreground size-5" />
                    <div>
                      <Paragraph>{info.value}</Paragraph>
                      <Paragraph className="text-muted-foreground text-sm">{info.title}</Paragraph>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>

        {/* Addresses */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <Heading variant="h3">Addresses</Heading>
            <Button variant="outline" size="sm">
              Add Address
            </Button>
          </div>

          {!!customer.addresses?.length ? (
            <div className="space-y-4">
              {customer.addresses.map((address: any) => (
                <div key={address.id} className="flex items-start gap-3">
                  <MapPin className="text-muted-foreground mt-1 size-4" />
                  <div className="flex-1">
                    <Paragraph className="font-medium">
                      {address.first_name} {address.last_name}
                    </Paragraph>
                    <Paragraph className="text-muted-foreground text-sm">
                      {address.address_1}
                      {address.address_2 && `, ${address.address_2}`}
                    </Paragraph>
                    <Paragraph className="text-muted-foreground text-sm">
                      {address.city}, {address.province} {address.postal_code}
                    </Paragraph>
                    <Paragraph className="text-muted-foreground text-sm">
                      {address.country_code?.toUpperCase()}
                    </Paragraph>
                    {(address.id === customer.default_billing_address_id ||
                      address.id === customer.default_shipping_address_id) && (
                      <div className="mt-1 flex gap-1">
                        {address.id === customer.default_billing_address_id && (
                          <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                            Default Billing
                          </span>
                        )}
                        {address.id === customer.default_shipping_address_id && (
                          <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                            Default Shipping
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-muted-foreground flex items-center gap-3">
              <MapPin className="size-4" />
              <Paragraph className="text-sm">No addresses saved yet</Paragraph>
            </div>
          )}
        </div>
      </section>

      <Separator />

      {/* Account Details */}
      <section>
        <Heading variant="h3" className="mb-4">
          Account Details
        </Heading>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {accountDetails.map((detail) => (
            <div key={detail.title}>
              <Paragraph className="text-muted-foreground text-sm font-medium">
                {detail.title}
              </Paragraph>
              <Paragraph className={detail.className}>{detail.value}</Paragraph>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Account Actions */}
      <section>
        <Heading variant="h3" className="mb-4">
          Account Actions
        </Heading>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="outline">Change Password</Button>
          {/* <Button variant="destructive">Delete Account</Button> */}
        </div>
      </section>
    </div>
  );
}
