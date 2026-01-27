"use client";

import { useCart } from "@/lib/cart";
import CartItem from "@/components/CartItem";
import Link from "next/link";
import { ArrowLeft, CreditCard } from "lucide-react";

export default function CartPage() {
  const { items, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
        <p className="text-gray-500 mb-8">Parece que aún no has agregado productos.</p>
        <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors"
        >
            <ArrowLeft className="w-5 h-5" /> Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tu Carrito de Compras</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border p-6">
            {items.map((item) => (
                <CartItem key={item.id} item={item} />
            ))}
            
            <button 
                onClick={clearCart}
                className="mt-6 text-red-500 text-sm hover:underline"
            >
                Vaciar carrito
            </button>
        </div>

        <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{total} Bs</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Envío</span>
                        <span>A convenir</span>
                    </div>
                </div>
                <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total</span>
                        <span className="text-blue-600">{total} Bs</span>
                    </div>
                </div>
                
                <Link
                    href="/checkout"
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                >
                    Proceder al Pago <CreditCard className="w-5 h-5" />
                </Link>
                <div className="mt-4 text-center">
                    <Link href="/" className="text-sm text-gray-500 hover:text-blue-600">
                        Continuar comprando
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
