"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { count } = useCart();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColorClass = isScrolled ? "text-text-primary" : "text-white";

  return (
    <nav className={cn(
      "fixed top-0 z-50 w-full transition-all duration-300",
      isScrolled 
        ? "border-b border-border-custom bg-bg-primary/90 backdrop-blur-md shadow-sm" 
        : "bg-transparent border-transparent"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gold-gradient">
              OfiriaStore
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`${textColorClass} hover:text-gold font-medium transition-colors`}>
              Inicio
            </Link>
            <Link href="/ofertas" className={`${textColorClass} hover:text-gold font-medium transition-colors`}>
              Ofertas
            </Link>
            <Link href="/mayoristas" className={`${textColorClass} hover:text-gold font-medium transition-colors`}>
              Mayoristas
            </Link>
            <div className="relative group">
              <button className={`${textColorClass} hover:text-gold font-medium transition-colors flex items-center gap-1`}>
                Categorías
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-bg-card border border-border-custom rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <Link href="/categoria/tecnologia" className="block px-4 py-2 text-text-secondary hover:bg-bg-elevated hover:text-gold rounded-t-xl">Tecnología</Link>
                <Link href="/categoria/hogar" className="block px-4 py-2 text-text-secondary hover:bg-bg-elevated hover:text-gold">Hogar</Link>
                <Link href="/categoria/belleza" className="block px-4 py-2 text-text-secondary hover:bg-bg-elevated hover:text-gold">Belleza</Link>
                <Link href="/categoria/accesorios" className="block px-4 py-2 text-text-secondary hover:bg-bg-elevated hover:text-gold">Accesorios</Link>
                <Link href="/categoria/otros" className="block px-4 py-2 text-text-secondary hover:bg-bg-elevated hover:text-gold rounded-b-xl">Otros</Link>
              </div>
            </div>
            <Link href="/quienes-somos" className={`${textColorClass} hover:text-gold font-medium transition-colors`}>
              Quienes Somos
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={cn(
                "relative p-2 rounded-full transition-all duration-300 overflow-hidden",
                theme === "dark" 
                  ? "shimmer-gold text-ceniza" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              )}
              aria-label="Cambiar tema"
            >
              <motion.div
                key={theme}
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </motion.div>
            </button>

            <Link href="/carrito" className={`relative p-2 ${textColorClass} hover:text-gold transition-colors`}>
              <ShoppingCart className="h-6 w-6" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-xs text-ceniza font-bold animate-bounce">
                  {count}
                </span>
              )}
            </Link>
            
            <button
              className={`md:hidden p-2 ${textColorClass}`}
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
            className="md:hidden border-t border-border-custom bg-bg-primary"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link href="/" className="block text-lg font-medium text-text-primary hover:text-gold" onClick={() => setIsOpen(false)}>
                Inicio
              </Link>
              <Link href="/ofertas" className="block text-lg font-medium text-text-primary hover:text-gold" onClick={() => setIsOpen(false)}>
                Ofertas
              </Link>
              <Link href="/mayoristas" className="block text-lg font-medium text-text-primary hover:text-gold" onClick={() => setIsOpen(false)}>
                Mayoristas
              </Link>
              <div className="space-y-2 pl-4 border-l border-white/10">
                <p className="text-sm text-text-muted uppercase tracking-wider">Categorías</p>
                <Link href="/categoria/tecnologia" className="block text-base font-medium text-text-secondary hover:text-gold" onClick={() => setIsOpen(false)}>
                  Tecnología
                </Link>
                <Link href="/categoria/hogar" className="block text-base font-medium text-text-secondary hover:text-gold" onClick={() => setIsOpen(false)}>
                  Hogar
                </Link>
                <Link href="/categoria/belleza" className="block text-base font-medium text-text-secondary hover:text-gold" onClick={() => setIsOpen(false)}>
                  Belleza
                </Link>
                <Link href="/categoria/accesorios" className="block text-base font-medium text-text-secondary hover:text-gold" onClick={() => setIsOpen(false)}>
                  Accesorios
                </Link>
                <Link href="/categoria/otros" className="block text-base font-medium text-text-secondary hover:text-gold" onClick={() => setIsOpen(false)}>
                  Otros
                </Link>
              </div>
              <Link href="/quienes-somos" className="block text-lg font-medium text-text-primary hover:text-gold" onClick={() => setIsOpen(false)}>
                Quienes Somos
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
