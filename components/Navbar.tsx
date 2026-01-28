"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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

// Definimos los enlaces del menú
const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/ofertas", label: "Ofertas" },
  { href: "/mayoristas", label: "Mayoristas" },
];

/**
 * NavLink Component - Enlace con indicador de ruta activa
 * 
 * Usa usePathname() para detectar la ruta actual y mostrar
 * una línea dorada brillante debajo del enlace activo.
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
  
  // Detectamos si esta ruta está activa
  const isActive = pathname === href;
  
  return (
    <Link 
      href={href} 
      className={cn(
        "relative pb-2 font-medium transition-colors text-sm tracking-wide",
        // Si está activo: texto dorado, sino: color normal con hover dorado
        isActive ? "text-gold" : `${textColorClass} hover:text-gold`
      )}
    >
      {children}
      
      {/* Línea dorada brillante - solo visible cuando está activo */}
      {isActive && (
        <span 
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold/50 via-gold to-gold/50 rounded-full"
          style={{
            boxShadow: "0 0 8px rgba(239, 184, 16, 0.6)"
          }}
        />
      )}
    </Link>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
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

  // En modo claro, usar dorado para mejor visibilidad
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
            <span className="text-2xl font-bold text-gold-gradient">
              OfiriaStore
            </span>
          </Link>

          {/* Desktop Menu - Usando NavLink para detección automática de ruta */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} textColorClass={textColorClass}>
                {link.label}
              </NavLink>
            ))}
            
            <div 
              className="relative"
              onMouseEnter={() => setHoveredCategory("categories")}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <button 
                className={cn(
                  "flex items-center gap-1 font-medium transition-colors py-2",
                  textColorClass,
                  "hover:text-gold"
                )}
              >
                <Sparkles className="w-4 h-4" />
                Categorías
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  hoveredCategory === "categories" && "rotate-180"
                )} />
              </button>
              
              <AnimatePresence>
                {hoveredCategory === "categories" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-1 w-56 rounded-xl border border-gold/20 bg-bg-primary/95 backdrop-blur-xl shadow-xl overflow-hidden"
                  >
                    <div className="p-2">
                      {categories.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                            "hover:bg-gold/10 hover:translate-x-1",
                            pathname === cat.href ? "text-gold bg-gold/5" : "text-text-primary"
                          )}
                        >
                          <cat.icon className={cn("w-5 h-5", cat.color)} />
                          <span className="font-medium">{cat.name}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
              {/* Mobile NavLinks con indicador activo */}
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
              
              <div className="border-t border-border-custom pt-4">
                <p className="text-sm text-text-muted mb-2">Categorías</p>
                {categories.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    className={cn(
                      "flex items-center gap-3 py-2 text-text-primary hover:text-gold transition-colors",
                      pathname === cat.href && "text-gold"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <cat.icon className="w-4 h-4" />
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
