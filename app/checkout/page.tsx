"use client";

import { useCart } from "@/lib/cart";
import { useState } from "react";
import { generateOrderPDF } from "@/lib/pdf";
import { db } from "@/lib/firebase"; // Ensure firebase is configged
import { collection, addDoc } from "firebase/firestore";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
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
        <h1 className="text-3xl font-bold mb-4">Carrito vacío</h1>
        <Link href="/" className="text-blue-600 hover:underline">Volver a la tienda</Link>
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

      // 1. Generate PDF
      generateOrderPDF(orderData, items);

      // 2. Save to Firestore (Try/Catch in case setup is incomplete)
      try {
        await addDoc(collection(db, "orders"), orderData);
      } catch (err) {
        console.error("Firestore save failed:", err);
        // Continue anyway as PDF is generated and WA is priority
      }

      // 3. WhatsApp Message
      const message = `📦 NUEVA COMPRA – OfiriaStore%0A%0ACódigo: ${code}%0ACliente: ${formData.name} ${formData.lastname}%0ATotal: ${total} Bs`;
      const waLink = `https://wa.me/59170000000?text=${message}`;

      // 4. Clear Cart and Redirect
      clearCart();
      window.open(waLink, "_blank");
      router.push("/"); // Or to a success page
      
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
      <Link href="/carrito" className="flex items-center text-gray-500 hover:text-gray-900 mb-6 w-fit">
        <ArrowLeft className="w-4 h-4 mr-1" /> Volver al Carrito
      </Link>
      
      <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border">
            <h2 className="text-xl font-bold mb-4">Datos Personales</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombres *</label>
                <input required type="text" className="w-full border rounded-lg p-3" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos *</label>
                <input required type="text" className="w-full border rounded-lg p-3" value={formData.lastname} onChange={e => setFormData({...formData, lastname: e.target.value})} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CI *</label>
                <input required type="text" className="w-full border rounded-lg p-3" value={formData.ci} onChange={e => setFormData({...formData, ci: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Departamento *</label>
                <select className="w-full border rounded-lg p-3" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})}>
                  {departments.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Celular *</label>
                <input required type="tel" className="w-full border rounded-lg p-3" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Celular Ref.</label>
                <input type="tel" className="w-full border rounded-lg p-3" value={formData.refPhone} onChange={e => setFormData({...formData, refPhone: e.target.value})} />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email (Opcional)</label>
              <input type="email" className="w-full border rounded-lg p-3" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>

            <div className="pt-6 border-t mt-6">
                <div className="flex justify-between items-center text-xl font-bold mb-6">
                    <span>Total a Pagar</span>
                    <span className="text-blue-600">{total} Bs</span>
                </div>
                
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Procesando..." : "Confirmar y Pagar"}
                </button>
                <p className="text-xs text-gray-500 text-center mt-4">
                    Al confirmar, se generará tu recibo y se abrirá WhatsApp para completar el pago.
                </p>
            </div>
          </form>
        </div>

        {/* QR Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border h-fit text-center">
            <h2 className="text-xl font-bold mb-6">Pago QR Simple</h2>
            <div className="relative aspect-square w-64 mx-auto bg-gray-100 rounded-xl mb-6 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300">
                {/* Placeholder for QR Code */}
                <div className="text-gray-400">
                    <p>Espacio para Imagen QR</p>
                    <p className="text-sm">(Placeholder)</p>
                </div>
                {/* <Image src="/qr-placeholder.png" alt="QR Payment" fill className="object-contain" /> */}
            </div>
            <p className="text-gray-600 mb-4">
                Escanea el código QR desde tu aplicación bancaria.
            </p>
            <button className="text-blue-600 hover:text-blue-800 font-medium text-sm border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                Descargar QR
            </button>
        </div>
      </div>
    </div>
  );
}
