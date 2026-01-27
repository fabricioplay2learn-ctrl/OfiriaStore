"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { useCart } from "@/lib/cart";
import { ShoppingCart } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-xl card-luxury"
    >
      <Link href={`/producto/${product.id}`} className="block h-full">
        <div className="relative aspect-square overflow-hidden bg-carboncillo">
          <Image
            src={product.imagen || "/placeholder.png"}
            alt={product.nombre}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.oferta && (
            <span className="absolute left-2 top-2 rounded-full bg-gold px-2 py-1 text-xs font-bold text-ceniza">
              OFERTA
            </span>
          )}
        </div>
        <div className="p-4">
          <p className="mb-1 text-xs text-gold-champan font-medium tracking-wide uppercase">{product.categoria}</p>
          <h3 className="mb-2 text-lg font-bold text-text-primary line-clamp-2 leading-snug">{product.nombre}</h3>
          
          <div className="mb-4 space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-gold">{product.precioUnitario} Bs</span>
              <span className="text-xs text-text-muted">Unidad</span>
            </div>
            {product.precioMayor > 0 && (
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-gold-champan">{product.precioMayor} Bs</span>
                <span className="text-xs text-text-muted">x Mayor</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-1 rounded-lg btn-outline-gold px-3 py-2 text-sm font-medium"
            >
              <ShoppingCart className="h-4 w-4" />
              Agregar
            </button>
            <WhatsAppButton href={generateWhatsAppLink(product)} className="w-full">
              Negociar
            </WhatsAppButton>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
