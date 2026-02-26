import { useState } from "react";
import { NavLink } from "react-router";

import type { HttpTypes } from "@medusajs/types";
import { Menu, SearchIcon, ShoppingCart, UserRound } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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

import { AnnouncementBar } from "./app-announcements";
import { AppLogo } from "./app-logo";
import { Search } from "./search";
import { Paragraph } from "./ui/text";

export function AppHeader({ cart }: { cart: HttpTypes.StoreCart | null }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <Collapsible
      open={searchOpen}
      onOpenChange={setSearchOpen}
      className="bg-background sticky top-0 z-50"
    >
      <AnnouncementBar />
      <header className="container grid grid-cols-3 items-center justify-between py-3 sm:py-5">
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
            <span className="sr-only">Sidebar menu</span>
          </MobileNav>
          <CollapsibleTrigger className="text-sm uppercase lg:hidden">
            <SearchIcon />
          </CollapsibleTrigger>
        </div>

        <NavLink to="/" className="flex justify-center">
          <AppLogo />
          <span className="sr-only">Home</span>
        </NavLink>

        <div className="flex items-center justify-end gap-4 font-medium lg:gap-6 [&_svg]:size-5">
          <CollapsibleTrigger className="hidden text-sm uppercase lg:flex">
            Search
            <span className="sr-only">Search</span>
          </CollapsibleTrigger>
          <NavLink className="text-sm uppercase" to="/account">
            <span className="hidden lg:inline">Account</span>
            <span className="lg:hidden">
              <UserRound />
              <span className="sr-only">Account</span>
            </span>
          </NavLink>
          <CartSheet cart={cart}>
            <span className="hidden lg:inline">Cart</span>
            <span className="lg:hidden">
              <ShoppingCart />
              <span className="sr-only">Cart</span>
            </span>
          </CartSheet>
        </div>
      </header>
      <CollapsibleContent>
        <Search setOpen={setSearchOpen} />
      </CollapsibleContent>
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

        <SheetFooter className="text-sm">
          <Paragraph className="flex gap-2">
            <span>Shipping to: </span>
            <img src="/assets/ng-flag.svg" className="size-5" />
            Nigeria
          </Paragraph>
          <Paragraph>&copy; {new Date().getFullYear()} Duftlab. All rights reserved.</Paragraph>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

const navItems = [
  { title: "Shop", href: "/collections/all" },
  { title: "Body Mist", href: "/categories/body-mist" },
  { title: "Body Spray", href: "/categories/body-spray" },
  { title: "Niche", href: "/categories/niche" },
  // { title: "Scents", href: "/collections/scents" },
  // { title: "Brands", href: "/brands" },
  // { title: "Sets", href: "/collections/sets" },
];
