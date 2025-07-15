import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("./routes/main-layout.tsx", [
    index("./routes/home.tsx"),
    route("/products/:handle", "./routes/product-details.tsx"),
    route("/cart", "./routes/cart.tsx"),
  ]),
] satisfies RouteConfig;
