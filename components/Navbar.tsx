"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X, Sun, Moon, ChevronDown, Smartphone, Home, Heart, Watch, Package, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/app/image/kali_sinmarket_.png";

const categories = [
  { name: "Tecnología", href: "/categoria/tecnologia", icon: Smartphone, color: "text-blue-400" },
  { name: "Hogar", href: "/categoria/hogar", icon: Home, color: "text-green-400" },
  { name: "Belleza", href: "/categoria/belleza", icon: Heart, color: "text-pink-400" },
  { name: "Accesorios", href: "/categoria/accesorios", icon: Watch, color: "text-purple-400" },
  { name: "Otros", href: "/categoria/otros", icon: Package, color: "text-orange-400" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
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
            
            <div 
              className="relative"
              onMouseEnter={() => setHoveredCategory("categories")}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <button 
                className={cn(
                  "flex items-center gap-1 font-medium transition-colors py-2",
                  textColorClass,
                  hoveredCategory === "categories" ? "text-gold" : ""
                )}
              >
                Categorías
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform duration-300",
                  hoveredCategory === "categories" ? "rotate-180 text-gold" : ""
                )} />
              </button>

              <AnimatePresence>
                {hoveredCategory === "categories" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-2 bg-bg-primary/95 backdrop-blur-xl border border-gold/20 rounded-2xl shadow-[0_10px_40px_-10px_rgba(239,184,16,0.3)] overflow-hidden"
                  >
                    <div className="grid gap-1">
                      {categories.map((cat, index) => (
                        <Link 
                          key={cat.name} 
                          href={cat.href}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group/item"
                        >
                          <div className={cn(
                            "p-2 rounded-lg bg-white/5 group-hover/item:bg-gold/10 transition-colors",
                            cat.color
                          )}>
                            <cat.icon className="w-5 h-5 group-hover/item:text-gold transition-colors" />
                          </div>
                          <div>
                            <span className="block text-sm font-medium text-text-primary group-hover/item:text-gold transition-colors">
                              {cat.name}
                            </span>
                          </div>
                          <Sparkles className="w-4 h-4 text-gold opacity-0 group-hover/item:opacity-100 transition-opacity ml-auto" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
                <p className="text-sm text-text-muted uppercase tracking-wider mb-2">Categorías</p>
                {categories.map((cat) => (
                  <Link 
                    key={cat.name}
                    href={cat.href} 
                    className="flex items-center gap-3 text-base font-medium text-text-secondary hover:text-gold py-1" 
                    onClick={() => setIsOpen(false)}
                  >
                    <cat.icon className="w-4 h-4" />
                    {cat.name}
                  </Link>
                ))}
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
