import PageBackground from "@/components/PageBackground";
import { Shield, Globe, Heart } from "lucide-react";

export default function QuienesSomosPage() {
  return (
    <PageBackground>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-poppins text-3xl md:text-5xl font-bold mb-6 text-text-primary text-center">
            Sobre <span className="text-gold-gradient">OfiriaStore</span>
          </h1>
          <p className="text-text-secondary text-lg text-center mb-12 max-w-2xl mx-auto">
            Somos tu puente directo a las mejores compras globales. Conectamos Bolivia con el mundo.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="card-luxury p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 text-gold">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Misión</h3>
              <p className="text-sm text-text-muted">Facilitar el acceso a productos internacionales de alta calidad para todos los bolivianos.</p>
            </div>
            
            <div className="card-luxury p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 text-gold">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Confianza</h3>
              <p className="text-sm text-text-muted">Garantizamos cada transacción y producto. Tu seguridad es nuestra prioridad.</p>
            </div>
            
            <div className="card-luxury p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 text-gold">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Pasión</h3>
              <p className="text-sm text-text-muted">Nos apasiona la tecnología y el diseño, y queremos compartir esa pasión contigo.</p>
            </div>
          </div>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-text-secondary leading-relaxed">
              Fundada con la visión de romper las barreras del comercio internacional, OfiriaStore se ha convertido en un referente de importaciones en Bolivia. Nos especializamos en traer lo último en tecnología, moda y accesorios, asegurando siempre que nuestros clientes reciban productos originales a precios justos.
            </p>
          </div>
        </div>
      </div>
    </PageBackground>
  );
}
