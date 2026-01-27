"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Eye } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/lib/cart";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-bg-card rounded-2xl overflow-hidden shadow-lg border border-border-custom group"
    >
      {/* Imagen */}
      <Link href={`/producto/${product.id}`}>
        <div className="relative aspect-square bg-carboncillo/50">
          <Image
            src={product.imagen || "/placeholder.png"}
            alt={product.nombre}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.oferta && (
              <span className="bg-gold text-ceniza text-xs font-semibold px-3 py-1 rounded-full shadow-gold">
                Oferta
              </span>
            )}
            {product.arancelCero && (
              <span className="bg-green-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Sin Arancel
              </span>
            )}
          </div>

          {/* Quick view overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="flex items-center gap-2 text-white text-sm font-medium">
              <Eye className="w-4 h-4" /> Ver detalles
            </span>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col gap-3">
        <span className="text-xs text-gold-champan font-medium uppercase tracking-wider">
          {product.categoria}
        </span>
        
        <Link href={`/producto/${product.id}`}>
          <h3 className="font-poppins text-sm md:text-base font-medium text-text-primary line-clamp-2 hover:text-gold transition-colors">
            {product.nombre}
          </h3>
        </Link>

        {/* Precios */}
        <div className="flex items-baseline gap-2">
          <span className="text-gold text-xl font-bold">
            {product.precioUnitario} Bs
          </span>
          {product.precioMayor > 0 && (
            <span className="text-text-muted text-sm line-through">
              {Math.round(product.precioUnitario * 1.2)} Bs
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gold/10 text-gold hover:bg-gold hover:text-ceniza transition-all duration-300 text-sm font-medium"
          >
            <ShoppingCart className="w-4 h-4" />
            Agregar
          </button>
          <Link
            href={`/producto/${product.id}`}
            className="p-2.5 rounded-xl border border-border-custom text-text-secondary hover:border-gold hover:text-gold transition-all duration-300"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>

        {/* Extra confianza */}
        <p className="text-xs text-text-muted pt-1 border-t border-border-custom">
          Importado por OfiriaStore 🇧🇴
        </p>
      </div>
    </motion.div>
  );
}
