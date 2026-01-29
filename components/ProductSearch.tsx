"use client";

import { Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

const popularTags = [
  { label: "Audífonos", href: "/categoria/tecnologia" },
  { label: "Hogar", href: "/categoria/hogar" },
  { label: "Ofertas", href: "/ofertas" },
  { label: "Relojes", href: "/categoria/accesorios" },
];

export default function ProductSearch() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="container mx-auto px-4 z-30 relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <div className="relative group">
          {/* Animated Glow Effect */}
          <motion.div 
            animate={{ 
              opacity: isFocused ? 0.6 : 0.2, 
              scale: isFocused ? 1.02 : 1 
            }}
            transition={{ duration: 0.4 }}
            className="absolute -inset-0.5 bg-gradient-to-r from-gold via-gold-bright to-gold rounded-full blur-md opacity-20 group-hover:opacity-40"
          ></motion.div>
          
          {/* Search Bar Container */}
          <div className={cn(
            "relative flex items-center rounded-full p-2 transition-all duration-300",
            "bg-ceniza/95 dark:bg-bg-card/40 backdrop-blur-md border border-white/10 shadow-sm",
            isFocused ? "border-gold/50 shadow-[0_0_15px_rgba(239,184,16,0.15)] ring-1 ring-gold/20" : "hover:border-gold/30 hover:bg-black/95 dark:hover:bg-bg-card/50"
          )}>
            <div className="pl-4 pr-3 text-gold">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="¿Qué estás buscando hoy?"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full bg-transparent text-sm md:text-base text-white placeholder:text-white/50 focus:outline-none py-2"
            />
            <button className="bg-gold hover:bg-gold-bright text-ceniza font-semibold px-6 py-2.5 rounded-full text-sm transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2">
              <span className="hidden sm:inline">Buscar</span>
              <Sparkles className="w-4 h-4 sm:hidden" />
            </button>
          </div>
        </div>

        {/* Popular Tags */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 mt-4"
        >
          <span className="text-xs text-text-muted mr-1 font-medium">Tendencias:</span>
          {popularTags.map((tag, index) => (
            <Link 
              key={tag.label} 
              href={tag.href}
            >
              <motion.span 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-text-secondary hover:text-gold hover:border-gold/30 hover:bg-gold/5 transition-all cursor-pointer"
              >
                {tag.label}
              </motion.span>
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
