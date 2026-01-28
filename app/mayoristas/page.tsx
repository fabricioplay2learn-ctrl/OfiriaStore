import PageBackground from "@/components/PageBackground";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function MayoristasPage() {
  return (
    <PageBackground>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-poppins text-3xl md:text-5xl font-bold mb-6 text-text-primary text-center">
            Venta al <span className="text-gold-gradient">Por Mayor</span>
          </h1>
          <p className="text-text-secondary text-lg text-center mb-12">
            Impulsa tu negocio con nuestros productos importados. Precios especiales para compras por volumen.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-bg-card/50 backdrop-blur-sm border border-border-custom rounded-xl p-6">
              <h3 className="text-xl font-bold text-gold mb-4">Beneficios</h3>
              <ul className="space-y-3">
                {[
                  "Precios competitivos del mercado",
                  "Envíos prioritarios a todo el país",
                  "Asesoramiento personalizado",
                  "Garantía directa de importador"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-text-secondary">
                    <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-bg-card/50 backdrop-blur-sm border border-border-custom rounded-xl p-6 flex flex-col justify-center items-center text-center">
              <h3 className="text-xl font-bold text-white mb-4">¿Interesado en distribuir?</h3>
              <p className="text-text-muted mb-6">Contáctanos para recibir nuestro catálogo actualizado y lista de precios mayoristas.</p>
              <button className="px-6 py-3 btn-gold rounded-full font-bold shadow-gold hover:scale-105 transition-transform">
                Contactar Asesor
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageBackground>
  );
}
