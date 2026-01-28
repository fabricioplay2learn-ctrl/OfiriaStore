"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Eye, MessageCircle } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/lib/cart";
import { generateWhatsAppLink } from "@/lib/whatsapp";

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

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(generateWhatsAppLink(product), "_blank");
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
              <span className="bg-blue-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Sin Arancel
              </span>
            )}
            {product.porTemporada && (
              <span className="bg-purple-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Temporada
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
      <div className="p-4 flex flex-col gap-2">
        <span className="text-xs text-gold-champan font-medium uppercase tracking-wider">
          {product.categoria}
        </span>
        
        <Link href={`/producto/${product.id}`}>
          <h3 className="font-poppins text-sm md:text-base font-medium text-text-primary line-clamp-2 hover:text-gold transition-colors">
            {product.nombre}
          </h3>
        </Link>

        {/* Precios con lógica mayorista */}
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-1">
            <span className="text-text-muted text-sm">Precio:</span>
            <span className="text-gold text-xl font-bold">
              Bs {product.precioUnitario > 0 ? product.precioUnitario : product.precioMayor}
            </span>
            <span className="text-text-muted text-sm"> [Unidad]</span>
          </div>
          {product.precioMayor > 0 ? (
            <p className="text-xs text-gold-champan">
              Mayorista: Bs {product.precioMayor} {'>'} 3 unidades
            </p>
          ) : (
            <p className="text-xs text-text-muted">
              Precio: Negociable [Mayorista]
            </p>
          )}
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gold/10 text-gold hover:bg-gold hover:text-ceniza transition-all duration-300 text-sm font-medium"
          >
            <ShoppingCart className="w-4 h-4" />
            Agregar
          </button>
          <motion.button
            onClick={handleWhatsApp}
            animate={{ 
              scale: [1, 1.08, 1],
              boxShadow: [
                "0 0 0px rgba(34, 197, 94, 0)",
                "0 0 15px rgba(34, 197, 94, 0.6)",
                "0 0 0px rgba(34, 197, 94, 0)"
              ]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.15, boxShadow: "0 0 20px rgba(34, 197, 94, 0.8)" }}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300 text-sm font-medium"
            title="Negociar por WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Línea de confianza */}
        <p className="text-xs text-text-muted pt-2 border-t border-border-custom flex items-center justify-between">
          <span>🇨🇳 CHN → 🇧🇴 BOL</span>
          {product.negociable && <span className="text-green-400">💬 Hablemos</span>}
        </p>
      </div>
    </motion.div>
  );
}
