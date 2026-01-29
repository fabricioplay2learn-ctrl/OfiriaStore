"use client";

import { Search } from "lucide-react";

export default function ProductSearch() {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-2xl mx-auto">
        <div className="relative group">
          {/* Glow effect on hover/focus */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-gold via-gold-bright to-gold rounded-full opacity-20 group-hover:opacity-40 transition duration-1000 blur"></div>
          
          <div className="relative flex items-center bg-bg-card rounded-full p-1 border border-white/10 group-hover:border-gold/30 transition-colors duration-300">
            <Search className="ml-4 w-5 h-5 text-gold" />
            <input
              type="text"
              placeholder="¿Qué estás buscando hoy?"
              className="w-full bg-transparent px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/70 focus:outline-none"
            />
            <button className="bg-gold hover:bg-gold-bright text-ceniza font-semibold px-6 py-2 rounded-full text-sm transition-all duration-300 transform hover:scale-105 shadow-lg">
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
