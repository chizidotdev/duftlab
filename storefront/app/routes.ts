import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("./routes/main-layout.tsx", [
    index("./routes/home.tsx"),

    route("/products/:handle", "./routes/product-details.tsx"),
    route("/collections/:handle", "./routes/collections.tsx"),
  ]),
  route("/checkout", "./routes/checkout.tsx"),

  // api
  route("/api/cart", "./routes/api/cart.ts"),
  route("/api/checkout", "./routes/api/checkout.ts"),
] satisfies RouteConfig;
