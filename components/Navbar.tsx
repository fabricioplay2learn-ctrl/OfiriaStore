"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/app/image/kali_sinmarket_.png";

// Definimos los enlaces del menú
const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/categorias", label: "Categorías" },
  { href: "/productos", label: "Productos" },
];

/**
 * NavLink Component - Enlace con indicador de ruta activa
 */
function NavLink({ 
  href, 
  children, 
  textColorClass 
}: { 
  href: string; 
  children: React.ReactNode; 
  textColorClass: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link 
      href={href} 
      className={cn(
        "relative pb-2 font-medium transition-colors text-sm tracking-wide",
        isActive ? "text-gold" : `${textColorClass} hover:text-gold`
      )}
    >
      {children}
      {isActive && (
        <span 
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold/50 via-gold to-gold/50 rounded-full"
          style={{ boxShadow: "0 0 8px rgba(239, 184, 16, 0.6)" }}
        />
      )}
    </Link>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { count } = useCart();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColorClass = isScrolled 
    ? (theme === "light" ? "text-gold" : "text-text-primary") 
    : "text-white";

  return (
    <nav className={cn(
      "fixed top-0 z-50 w-full transition-all duration-300",
      isScrolled 
        ? "border-b border-gold/20 bg-bg-primary/90 backdrop-blur-md shadow-[0_4px_30px_rgba(239,184,16,0.1)]" 
        : "bg-transparent border-transparent"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <Image 
              src={Logo} 
              alt="OfiriaStore Logo" 
              width={40} 
              height={40} 
              className="object-contain w-10 h-10 group-hover:scale-110 transition-transform duration-300" 
            />
            <span className="text-2xl font-bold font-outfit tracking-wide text-gold-gradient">
              OfiriaStore
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} textColorClass={textColorClass}>
                {link.label}
              </NavLink>
            ))}
            
            <NavLink href="/mayoristas" textColorClass={textColorClass}>
              Mayoristas
            </NavLink>
          </div>

          <div className="flex items-center space-x-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={cn(
                "p-2 rounded-full transition-all duration-300",
                textColorClass,
                "hover:text-gold hover:bg-gold/10"
              )}
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === "dark" ? 0 : 180 }}
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
            className="md:hidden bg-bg-primary/95 backdrop-blur-xl border-t border-border-custom"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={cn(
                    "block text-lg font-medium transition-colors",
                    pathname === link.href 
                      ? "text-gold border-l-2 border-gold pl-3" 
                      : "text-text-primary hover:text-gold"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <Link 
                href="/mayoristas" 
                className={cn(
                  "block text-lg font-medium transition-colors border-t border-border-custom pt-4",
                  pathname === "/mayoristas" 
                    ? "text-gold pl-3" 
                    : "text-text-primary hover:text-gold"
                )}
                onClick={() => setIsOpen(false)}
              >
                Mayoristas
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
