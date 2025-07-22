import { NavLink } from "react-router";

import type { HttpTypes } from "@medusajs/types";
import { Menu, SearchIcon, ShoppingCart, UserRound } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { CartSheet } from "@/modules/cart/cart-sheet";

import { AppLogo } from "./app-logo";
import { Search } from "./search";

export function AppHeader({ cart }: { cart: HttpTypes.StoreCart | null }) {
  return (
    <header className="container grid grid-cols-3 items-center justify-between py-6">
      <nav className="hidden items-center gap-6 font-medium lg:flex">
        {navItems.map((item) => (
          <NavLink key={item.title} to={item.href} className="text-sm uppercase">
            {item.title}
          </NavLink>
        ))}
      </nav>

      {/* Mobile nav */}
      <div className="flex items-center gap-4 lg:hidden [&_svg]:size-5">
        <MobileNav>
          <Menu />
        </MobileNav>
        <Search className="text-sm uppercase lg:hidden">
          <SearchIcon />
        </Search>
      </div>

      <NavLink to="/" className="flex justify-center">
        <AppLogo />
      </NavLink>

      <div className="flex items-center justify-end gap-4 font-medium lg:gap-6 [&_svg]:size-5">
        <Search className="hidden text-sm uppercase lg:flex">Search</Search>
        <NavLink className="text-sm uppercase" to="/account">
          <span className="hidden lg:inline">Account</span>
          <span className="lg:hidden">
            <UserRound />
          </span>
        </NavLink>
        <CartSheet cart={cart}>
          <span className="hidden lg:inline">Cart</span>
          <span className="lg:hidden">
            <ShoppingCart />
          </span>
        </CartSheet>
      </div>
    </header>
  );
}

export function MobileNav({ children }: { children: React.ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>

      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription />
        </SheetHeader>

        <nav className="container flex flex-col gap-6 font-medium">
          {navItems.map((item) => (
            <SheetClose asChild key={item.title}>
              <NavLink to={item.href} className="text-lg uppercase">
                {item.title}
              </NavLink>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

const navItems = [
  { title: "Shop", href: "/collections/all" },
  { title: "Unboxed", href: "/collections/unboxed" },
  { title: "By Scent", href: "/collections/by-scent" },
  { title: "Sets", href: "/collections/sets" },
];
