import { getProductById } from "@/lib/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import WhatsAppButton from "@/components/WhatsAppButton";
 

// We need a client component for the "Add to Cart" logic with state (quantity)
// So I will create a separate component for the actions or make this page client?
// Better to keep page server and make a client component for the interactive part.

import ProductActions from "@/components/ProductActions";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Gallery (Simple for now) */}
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
          <Image
            src={product.imagen || "/placeholder.png"}
            alt={product.nombre}
            fill
            className="object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <span className="text-sm text-gray-500 font-medium uppercase tracking-wide mb-2">{product.categoria}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.nombre}</h1>
          
          <div className="flex items-end gap-4 mb-6">
            <div className="flex flex-col">
                <span className="text-sm text-gray-500">Precio Unidad</span>
                <span className="text-3xl font-bold text-blue-600">{product.precioUnitario} Bs</span>
            </div>
            {product.precioMayor > 0 && (
                <div className="flex flex-col pl-4 border-l">
                    <span className="text-sm text-gray-500">Por Mayor (+3 u.)</span>
                    <span className="text-2xl font-bold text-green-600">{product.precioMayor} Bs</span>
                </div>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            {product.descripcion}
          </p>
          
          <div className="mt-auto">
             <ProductActions product={product} />
          </div>
          
          <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-gray-500">
             <div className="flex items-center gap-2">
                ✅ Garantía de calidad
             </div>
             <div className="flex items-center gap-2">
                📦 Envío a todo el país
             </div>
             <div className="flex items-center gap-2">
                🔒 Compra segura
             </div>
             <div className="flex items-center gap-2">
                📄 Factura disponible
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
