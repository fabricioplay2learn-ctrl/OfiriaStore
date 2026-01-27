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
        className="group relative overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      <Link href={`/producto/${product.id}`} className="block h-full">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.imagen || "/placeholder.png"}
            alt={product.nombre}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.oferta && (
            <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
              OFERTA
            </span>
          )}
        </div>
        <div className="p-4">
          <p className="mb-1 text-xs text-gray-500 font-medium tracking-wide uppercase">{product.categoria}</p>
          <h3 className="mb-2 text-lg font-bold text-gray-900 line-clamp-2 leading-snug">{product.nombre}</h3>
          
          <div className="mb-4 space-y-1">
            <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-blue-600">{product.precioUnitario} Bs</span>
                <span className="text-xs text-gray-500">Unidad</span>
            </div>
            {product.precioMayor > 0 && (
                <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold text-green-600">{product.precioMayor} Bs</span>
                    <span className="text-xs text-gray-500">x Mayor</span>
                </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-1 rounded-lg border border-blue-600 bg-white px-3 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
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
