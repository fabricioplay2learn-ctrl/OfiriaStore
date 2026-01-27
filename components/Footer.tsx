export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent mb-4">
              OfiriaStore
            </h3>
            <p className="text-gray-400 mb-4">
              Tu puerta de acceso a productos globales con precios locales.
              Seguridad, rapidez y confianza.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Categorías</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/categoria/tecnologia" className="hover:text-blue-400">Tecnología</a></li>
              <li><a href="/categoria/hogar" className="hover:text-blue-400">Hogar</a></li>
              <li><a href="/categoria/belleza" className="hover:text-blue-400">Belleza</a></li>
              <li><a href="/categoria/accesorios" className="hover:text-blue-400">Accesorios</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contacto</h4>
            <p className="text-gray-400 mb-2">WhatsApp: +591 63921522</p>
            <p className="text-gray-400 mb-2">Email: contacto@ofiriachain.com</p>
            <p className="text-gray-400">Bolivia</p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} OfiriaStore. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
