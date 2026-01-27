"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { count } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              OfiriaStore
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Inicio
            </Link>
            <Link href="/categoria/tecnologia" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Tecnología
            </Link>
            <Link href="/categoria/hogar" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Hogar
            </Link>
            <div className="relative group">
                <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                    Categorías
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <Link href="/categoria/belleza" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-t-xl">Belleza</Link>
                    <Link href="/categoria/accesorios" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600">Accesorios</Link>
                    <Link href="/categoria/otros" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-b-xl">Otros</Link>
                </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/carrito" className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white font-bold animate-bounce">
                  {count}
                </span>
              )}
            </Link>
            
            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-white"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link href="/" className="block text-lg font-medium text-gray-700" onClick={() => setIsOpen(false)}>
                Inicio
              </Link>
              <Link href="/categoria/tecnologia" className="block text-lg font-medium text-gray-700" onClick={() => setIsOpen(false)}>
                Tecnología
              </Link>
              <Link href="/categoria/hogar" className="block text-lg font-medium text-gray-700" onClick={() => setIsOpen(false)}>
                Hogar
              </Link>
               <Link href="/categoria/belleza" className="block text-lg font-medium text-gray-700" onClick={() => setIsOpen(false)}>
                Belleza
              </Link>
              <Link href="/categoria/accesorios" className="block text-lg font-medium text-gray-700" onClick={() => setIsOpen(false)}>
                Accesorios
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
