import type { Metadata } from "next";
import { Inter, Outfit, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart";
import { ThemeProvider } from "@/lib/theme";
import PageWrapper from "@/components/PageWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins" });

export const metadata: Metadata = {
  title: "OfiriaStore - Tu puente a compras globales",
  description: "Compra productos importados en Bolivia a precios increíbles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-theme="dark">
      <body className={`${inter.variable} ${outfit.variable} ${poppins.variable} font-sans flex flex-col min-h-screen`}>
        <ThemeProvider>
          <CartProvider>
            <Navbar />
            <PageWrapper>{children}</PageWrapper>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
