import PageBackground from "@/components/PageBackground";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function OfertasPage() {
  return (
    <PageBackground>
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-poppins text-3xl md:text-5xl font-bold mb-6 text-text-primary">
          Ofertas <span className="text-gold-gradient">Destacadas</span>
        </h1>
        <p className="text-text-secondary text-lg max-w-2xl mb-8">
          Descubre nuestros mejores precios en productos seleccionados. Calidad premium con descuentos exclusivos.
        </p>
        
        {/* Placeholder for content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-bg-card border border-border-custom rounded-xl p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
            <p className="text-text-muted mb-4">Próximamente más ofertas</p>
            <Link href="/" className="text-gold hover:underline flex items-center gap-2">
              Volver al inicio <ArrowRight className="w-4 h-4"/>
            </Link>
          </div>
        </div>
      </div>
    </PageBackground>
  );
}
