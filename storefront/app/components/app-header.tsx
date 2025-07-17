import { NavLink } from "react-router";

import type { HttpTypes } from "@medusajs/types";

import { CartSheet } from "@/modules/cart/cart-sheet";

import { AppLogo } from "./app-logo";
import { Search } from "./search";

export function AppHeader({ cart }: { cart: HttpTypes.StoreCart | null }) {
  return (
    <header className="flex items-center justify-between py-6">
      <nav className="flex items-center gap-6 font-medium">
        {navItems.map((item) => (
          <NavLink key={item.title} to={item.href} className="text-sm uppercase">
            {item.title}
          </NavLink>
        ))}
      </nav>

      <NavLink to="/">
        <AppLogo />
      </NavLink>

      <div className="flex items-center gap-6 font-medium">
        <Search className="text-sm uppercase" />
        <NavLink className="text-sm uppercase" to="/account">
          Account
        </NavLink>
        <CartSheet cart={cart} />
      </div>
    </header>
  );
}

const navItems = [
  { title: "Shop", href: "/collections/all" },
  { title: "Unboxed", href: "/collections/unboxed" },
  { title: "By Scent", href: "/collections/by-scent" },
  { title: "Sets", href: "/collections/sets" },
];
