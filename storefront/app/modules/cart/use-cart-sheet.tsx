import { createContext, useContext, useState } from "react";

const CartSheetContext = createContext<{ open: boolean; setOpen: (open: boolean) => void }>({
  open: false,
  setOpen: () => {},
});

export function CartSheetProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <CartSheetContext.Provider value={{ open, setOpen }}>{children}</CartSheetContext.Provider>
  );
}

export function useCartSheet() {
  const context = useContext(CartSheetContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
