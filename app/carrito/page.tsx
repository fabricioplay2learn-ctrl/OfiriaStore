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
        <h1 className="text-3xl font-bold mb-4 text-text-primary">Tu carrito está vacío</h1>
        <p className="text-text-muted mb-8">Parece que aún no has agregado productos.</p>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 btn-gold py-3 px-6 rounded-xl"
        >
          <ArrowLeft className="w-5 h-5" /> Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-text-primary">Tu Carrito de <span className="text-gold">Compras</span></h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 card-luxury rounded-2xl p-6">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          
          <button 
            onClick={clearCart}
            className="mt-6 text-red-400 text-sm hover:underline"
          >
            Vaciar carrito
          </button>
        </div>

        <div className="lg:col-span-1">
          <div className="card-luxury rounded-2xl p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4 text-text-primary">Resumen del Pedido</h2>
            <div className="space-y-2 mb-4 text-sm text-text-secondary">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{total} Bs</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span>A convenir</span>
              </div>
            </div>
            <div className="border-t border-border-custom pt-4 mb-6">
              <div className="flex justify-between items-center text-lg font-bold">
                <span className="text-text-primary">Total</span>
                <span className="text-gold">{total} Bs</span>
              </div>
            </div>
            
            <Link
              href="/checkout"
              className="w-full flex items-center justify-center gap-2 btn-gold font-bold py-4 rounded-xl shadow-gold"
            >
              Proceder al Pago <CreditCard className="w-5 h-5" />
            </Link>
            <div className="mt-4 text-center">
              <Link href="/" className="text-sm text-text-muted hover:text-gold transition-colors">
                Continuar comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
