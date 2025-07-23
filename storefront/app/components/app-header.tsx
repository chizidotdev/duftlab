import { NavLink } from "react-router";

import type { HttpTypes } from "@medusajs/types";
import { Menu, SearchIcon, ShoppingCart, UserRound } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { CartSheet } from "@/modules/cart/cart-sheet";

import { AppLogo } from "./app-logo";
import { Search } from "./search";

export function AppHeader({ cart }: { cart: HttpTypes.StoreCart | null }) {
  return (
    <Collapsible>
      <div className="bg-background sticky top-0 z-50">
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
            <CollapsibleTrigger className="text-sm uppercase lg:hidden">
              <SearchIcon />
            </CollapsibleTrigger>
          </div>

          <NavLink to="/" className="flex justify-center">
            <AppLogo />
          </NavLink>

          <div className="flex items-center justify-end gap-4 font-medium lg:gap-6 [&_svg]:size-5">
            <CollapsibleTrigger className="hidden text-sm uppercase lg:flex">
              Search
            </CollapsibleTrigger>
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
        <CollapsibleContent>
          <Search />
        </CollapsibleContent>
      </div>
    </Collapsible>
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
              <NavLink to={item.href} className="px-3 text-lg uppercase">
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
  { title: "Brands", href: "/collections/brands" },
  { title: "Scents", href: "/collections/scents" },
  { title: "Unboxed", href: "/collections/unboxed" },
  { title: "Sets", href: "/collections/sets" },
];
