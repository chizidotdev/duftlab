import { PostHogProvider as PostHog } from "posthog-js/react";

const POSTHOG_KEY = "phc_GZUyA6e4n1irNE3fXrQHORVhDM0ftqQMVmKI4YGOe5W";
const POSTHOG_HOST = "https://us.i.posthog.com";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PostHog apiKey={POSTHOG_KEY} options={{ api_host: POSTHOG_HOST, defaults: "2025-05-24" }}>
      {children}
    </PostHog>
  );
}
