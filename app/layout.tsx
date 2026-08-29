import type { Metadata } from "next";
import { ppEditorialNew, suisseIntl } from "./fonts";
import { CartProvider } from "@/components/cart/CartProvider";
import CartDrawer from "@/components/cart/CartDrawer";
import "./globals.css";

export const metadata: Metadata = {
  title: "ARTISUN — A New Language of Suncare",
  description: "ARTISUN — premium suncare redefined. A new language of sun protection crafted for those who move through the world with intention.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ppEditorialNew.variable} ${suisseIntl.variable}`}>
      <body suppressHydrationWarning>
        {/* CartProvider wraps everything so both HomeHeader and GlobalHeader can
            read the cart. CartDrawer is a sibling of the page so it overlays
            every route without each page having to mount it. */}
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
