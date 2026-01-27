"use client";

import { useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/lib/cart";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import WhatsAppButton from "./WhatsAppButton";
import { ShoppingCart, Minus, Plus } from "lucide-react";

export default function ProductActions({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleDecrease = () => setQuantity(Math.max(1, quantity - 1));
  const handleIncrease = () => setQuantity(quantity + 1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="font-medium text-text-secondary">Cantidad:</label>
        <div className="flex items-center border border-border-custom rounded-lg">
          <button 
            onClick={handleDecrease}
            className="p-2 hover:bg-bg-elevated transition-colors text-text-secondary"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center font-bold text-text-primary">{quantity}</span>
          <button 
            onClick={handleIncrease}
            className="p-2 hover:bg-bg-elevated transition-colors text-text-secondary"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleAddToCart}
          className="flex-1 flex items-center justify-center gap-2 btn-gold font-bold py-3 px-6 rounded-xl shadow-gold"
        >
          <ShoppingCart className="w-5 h-5" />
          Agregar al Carrito
        </button>
        <WhatsAppButton 
          href={generateWhatsAppLink(product, quantity, quantity >= 3)} 
          className="flex-1 py-3 px-6 rounded-xl text-base"
        >
          Negociar en WhatsApp
        </WhatsAppButton>
      </div>
    </div>
  );
}
