import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from "react-router";

import { QueryProvider } from "@/components/query-provider";
import { Toaster } from "@/components/ui/sonner";

import styles from "@/app.css?url";

import type { Route } from "./+types/root";
import { SplashScreenProvider } from "./components/app-splash-screen";
import { PostHogProvider } from "./components/posthog-provider";
import { WhatsappChat } from "./components/whatsapp-chat";
import { siteConfig } from "./lib/site-config";
import {
  StructuredDataScript,
  createOrganizationSchema,
  createWebSiteSchema,
} from "./lib/utils/seo";

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  {
    rel: "preconnect",
    href: "https://www.googletagmanager.com",
  },
  {
    rel: "preload",
    href: "https://www.googletagmanager.com/gtag/js?id=G-9FXXSKK3VD",
    as: "script",
  },
];

export function meta({ location }: Route.MetaArgs) {
  const canonicalUrl = `${siteConfig.url}${location.pathname}`;

  return [
    { title: siteConfig.title },
    { name: "description", content: siteConfig.description },
    { rel: "canonical", href: canonicalUrl },
    { property: "og:title", content: siteConfig.title },
    { property: "og:description", content: siteConfig.description },
    { property: "og:image", content: siteConfig.ogImage },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:type", content: "image/png" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: canonicalUrl },
    { property: "og:site_name", content: siteConfig.siteName },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: siteConfig.ogImage },
    { name: "twitter:title", content: siteConfig.title },
    { name: "twitter:description", content: siteConfig.description },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <StructuredDataScript data={[createOrganizationSchema(), createWebSiteSchema()]} />
      </head>
      <body>
        {children}
        <Toaster />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <QueryProvider>
      <SplashScreenProvider>
        <PostHogProvider>
          <WhatsappChat />
          <Outlet />
        </PostHogProvider>
      </SplashScreenProvider>
    </QueryProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
