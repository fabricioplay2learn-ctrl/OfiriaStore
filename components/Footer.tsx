export default function Footer() {
  return (
    <footer className="bg-ceniza text-text-primary pt-12 pb-8 border-t border-border-custom">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Story */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-gold-gradient mb-4">
              OfiriaStore
            </h3>
            <p className="text-text-secondary mb-4 leading-relaxed">
              Somos José & América. Nacimos con una misión simple: 
              <span className="text-gold"> Conectar Bolivia con el mundo</span>. 
              Importamos productos de calidad desde otros países, 
              eliminando intermediarios para ofrecerte los mejores precios.
            </p>
            <p className="text-text-muted text-sm">
              Confianza, transparencia y servicio personalizado.
            </p>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gold">Categorías</h4>
            <ul className="space-y-2 text-text-secondary">
              <li><a href="/categoria/tecnologia" className="hover:text-gold transition-colors">Tecnología</a></li>
              <li><a href="/categoria/hogar" className="hover:text-gold transition-colors">Hogar</a></li>
              <li><a href="/categoria/belleza" className="hover:text-gold transition-colors">Belleza</a></li>
              <li><a href="/categoria/accesorios" className="hover:text-gold transition-colors">Accesorios</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gold">Contacto</h4>
            <p className="text-text-secondary mb-2">WhatsApp: +591 63921522</p>
            <p className="text-text-secondary mb-2">Email: ceo@ofiriachain.com</p>
            <p className="text-text-secondary">Bolivia 🇧🇴</p>
          </div>
        </div>
        
        <div className="border-t border-border-custom pt-8 text-center text-text-muted text-sm">
          <p>&copy; {new Date().getFullYear()} OfiriaStore by J&A. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
