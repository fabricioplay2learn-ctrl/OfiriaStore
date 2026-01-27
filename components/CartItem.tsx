"use client";

import Image from "next/image";
import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/lib/cart";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleDecrease = () => updateQuantity(item.id, item.quantity - 1);
  const handleIncrease = () => updateQuantity(item.id, item.quantity + 1);
  const handleRemove = () => removeFromCart(item.id);

  const price = item.quantity >= 3 && item.precioMayor > 0 ? item.precioMayor : item.precioUnitario;

  return (
    <div className="flex items-center gap-4 py-4 border-b last:border-0">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={item.imagen}
          alt={item.nombre}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="font-medium text-gray-900 line-clamp-2">{item.nombre}</h3>
          <p className="mt-1 text-sm text-gray-500">{item.categoria}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
            <div className="font-bold text-gray-900">
                {price} Bs 
                {item.quantity >= 3 && item.precioMayor > 0 && <span className="ml-2 text-xs text-green-600 font-normal">x Mayor</span>}
            </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center border rounded-lg">
          <button 
            onClick={handleDecrease}
            className="p-1 hover:bg-gray-100 transition-colors"
             disabled={item.quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
          <button 
            onClick={handleIncrease}
            className="p-1 hover:bg-gray-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <button 
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700 transition-colors p-1"
        >
            <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
