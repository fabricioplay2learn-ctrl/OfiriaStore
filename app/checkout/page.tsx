"use client";

import { useCart } from "@/lib/cart";
import { useState } from "react";
import { generateOrderPDF } from "@/lib/pdf";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    ci: "",
    department: "Santa Cruz",
    phone: "",
    refPhone: "",
    email: "",
  });

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4 text-text-primary">Carrito vacío</h1>
        <Link href="/" className="text-gold hover:underline">Volver a la tienda</Link>
      </div>
    );
  }

  const generateOrderCode = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 100000).toString().padStart(6, "0");
    return `OFI-${year}-${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const code = generateOrderCode();
      const orderData = {
        code,
        date: new Date().toLocaleDateString(),
        customer: formData,
        items,
        total,
        status: "pending"
      };

      generateOrderPDF(orderData, items);

      try {
        await addDoc(collection(db, "orders"), orderData);
      } catch (err) {
        console.error("Firestore save failed:", err);
      }

      const message = `📦 NUEVA COMPRA – OfiriaStore%0A%0ACódigo: ${code}%0ACliente: ${formData.name} ${formData.lastname}%0ATotal: ${total} Bs`;
      const waLink = `https://wa.me/59170000000?text=${message}`;

      clearCart();
      window.open(waLink, "_blank");
      router.push("/");
      
    } catch (error) {
      console.error("Error processing order:", error);
      alert("Hubo un error al procesar tu pedido. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const departments = [
    "Santa Cruz", "La Paz", "Cochabamba", "Potosí", "Oruro", "Beni", "Tarija", "Pando", "Chuquisaca"
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/carrito" className="flex items-center text-text-muted hover:text-gold mb-6 w-fit transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> Volver al Carrito
      </Link>
      
      <h1 className="text-3xl font-bold mb-8 text-text-primary">Finalizar <span className="text-gold">Compra</span></h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <form onSubmit={handleSubmit} className="space-y-6 card-luxury p-8 rounded-2xl">
            <h2 className="text-xl font-bold mb-4 text-text-primary">Datos Personales</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Nombres *</label>
                <input required type="text" className="w-full border border-border-custom rounded-lg p-3 bg-bg-elevated text-text-primary focus:border-gold focus:outline-none transition-colors" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Apellidos *</label>
                <input required type="text" className="w-full border border-border-custom rounded-lg p-3 bg-bg-elevated text-text-primary focus:border-gold focus:outline-none transition-colors" value={formData.lastname} onChange={e => setFormData({...formData, lastname: e.target.value})} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">CI *</label>
                <input required type="text" className="w-full border border-border-custom rounded-lg p-3 bg-bg-elevated text-text-primary focus:border-gold focus:outline-none transition-colors" value={formData.ci} onChange={e => setFormData({...formData, ci: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Departamento *</label>
                <select className="w-full border border-border-custom rounded-lg p-3 bg-bg-elevated text-text-primary focus:border-gold focus:outline-none transition-colors" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})}>
                  {departments.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Celular *</label>
                <input required type="tel" className="w-full border border-border-custom rounded-lg p-3 bg-bg-elevated text-text-primary focus:border-gold focus:outline-none transition-colors" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Celular Ref.</label>
                <input type="tel" className="w-full border border-border-custom rounded-lg p-3 bg-bg-elevated text-text-primary focus:border-gold focus:outline-none transition-colors" value={formData.refPhone} onChange={e => setFormData({...formData, refPhone: e.target.value})} />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Email (Opcional)</label>
              <input type="email" className="w-full border border-border-custom rounded-lg p-3 bg-bg-elevated text-text-primary focus:border-gold focus:outline-none transition-colors" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>

            <div className="pt-6 border-t border-border-custom mt-6">
              <div className="flex justify-between items-center text-xl font-bold mb-6">
                <span className="text-text-primary">Total a Pagar</span>
                <span className="text-gold">{total} Bs</span>
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full btn-gold font-bold py-4 rounded-xl shadow-gold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Procesando..." : "Confirmar y Pagar"}
              </button>
              <p className="text-xs text-text-muted text-center mt-4">
                Al confirmar, se generará tu recibo y se abrirá WhatsApp para completar el pago.
              </p>
            </div>
          </form>
        </div>

        {/* QR Section */}
        <div className="card-luxury p-8 rounded-2xl h-fit text-center">
          <h2 className="text-xl font-bold mb-6 text-text-primary">Pago QR <span className="text-gold">Simple</span></h2>
          <div className="relative aspect-square w-64 mx-auto bg-carboncillo rounded-xl mb-6 flex items-center justify-center overflow-hidden border-2 border-dashed border-gold/30">
            <div className="text-text-muted">
              <p>Espacio para Imagen QR</p>
              <p className="text-sm">(Placeholder)</p>
            </div>
          </div>
          <p className="text-text-secondary mb-4">
            Escanea el código QR desde tu aplicación bancaria.
          </p>
          <button className="text-gold hover:text-gold-bright font-medium text-sm border border-gold/50 px-4 py-2 rounded-lg hover:bg-gold/10 transition-colors">
            Descargar QR
          </button>
        </div>
      </div>
    </div>
  );
}
