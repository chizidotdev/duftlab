import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("./routes/main-layout.tsx", [
    index("./routes/home.tsx"),

    route("/products/:handle", "./routes/product-details.tsx"),
    route("/collections/:handle", "./routes/collections.tsx"),
    route("/brands", "./routes/brands.tsx"),

    layout("./routes/auth.tsx", [
      route("/auth/login", "./routes/auth-login.tsx"),
      route("/auth/register", "./routes/auth-register.tsx"),
      route("/auth/reset-password", "./routes/auth-reset-password.tsx"),
    ]),
    route("/account", "./routes/account.tsx"),
    route("/account/orders", "./routes/account-orders.tsx"),
    route("/checkout-confirm", "./routes/checkout-confirm.tsx"),
  ]),
  route("/checkout", "./routes/checkout.tsx"),

  // api
  route("/api/search", "./routes/api/search.ts"),
  route("/api/cart", "./routes/api/cart.ts"),
  route("/api/checkout", "./routes/api/checkout.ts"),
  route("/api/login", "./routes/api/login.ts"),
  route("/api/register", "./routes/api/register.ts"),
  route("/api/password-reset", "./routes/api/password-reset.ts"),
] satisfies RouteConfig;
