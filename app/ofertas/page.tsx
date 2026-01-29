import PageBackground from "@/components/PageBackground";
import { ArrowRight, Tag, Percent, Calendar } from "lucide-react";
import Link from "next/link";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";

export default function OfertasPage() {
  // Filter products that are on Offer, Duty Free, or Seasonal
  const ofertasProducts = products.filter(
    (p) => p.oferta || p.arancelCero || p.porTemporada
  );

  return (
    <PageBackground>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="font-poppins text-3xl md:text-5xl font-bold mb-3 text-text-primary">
              Ofertas <span className="text-gold">Destacadas</span>
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl">
              Descubre nuestros mejores precios, productos sin aranceles y ediciones limitadas de temporada.
            </p>
          </div>
          
          <div className="flex gap-2">
             <div className="px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-medium border border-gold/20 flex items-center gap-1">
                <Percent className="w-3 h-3" /> Ofertas
             </div>
             <div className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20 flex items-center gap-1">
                <Tag className="w-3 h-3" /> Sin Arancel
             </div>
             <div className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium border border-purple-500/20 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Temporada
             </div>
          </div>
        </div>
        
        {ofertasProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {ofertasProducts.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-bg-card border border-border-custom rounded-xl p-12 flex flex-col items-center justify-center text-center min-h-[300px]">
            <p className="text-text-muted mb-4 text-xl">No hay ofertas disponibles en este momento.</p>
            <Link href="/" className="text-gold hover:underline flex items-center gap-2">
              Volver al inicio <ArrowRight className="w-4 h-4"/>
            </Link>
          </div>
        )}
      </div>
    </PageBackground>
  );
}
