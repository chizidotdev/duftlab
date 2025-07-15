import { NavLink } from "react-router";

import type { HttpTypes } from "@medusajs/types";

import { CartButton } from "@/modules/cart/cart-button";

import { AppLogo } from "./app-logo";
import { Search } from "./search";

export function AppHeader({ cart }: { cart: Promise<HttpTypes.StoreCart | null> }) {
  return (
    <header className="flex items-center justify-between py-6">
      <nav className="flex items-center gap-6">
        {navItems.map((item) => (
          <NavLink key={item.title} to={item.href} className="text-xs uppercase">
            {item.title}
          </NavLink>
        ))}
      </nav>

      <NavLink to="/">
        <AppLogo />
      </NavLink>

      <div className="flex items-center gap-6">
        <Search className="text-xs uppercase" />
        <NavLink className="text-xs uppercase" to="/account">
          Account
        </NavLink>
        <CartButton cart={cart} />
      </div>
    </header>
  );
}

const navItems = [
  { title: "Shop", href: "/collections/all" },
  { title: "Deodorant", href: "/collections/deodorant" },
  { title: "By Scent", href: "/collections/by-scent" },
  { title: "Sets", href: "/collections/sets" },
];
