"use client";

import { Search } from "lucide-react";

export default function ProductSearch() {
  return (
    <div className="container mx-auto px-4 my-8">
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Buscar productos, marcas o categorías..."
            className="w-full pl-11 pr-4 py-3 rounded-full bg-bg-card border border-border-custom text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold transition"
          />
        </div>
      </div>
    </div>
  );
}
