import Link from "next/link";
import { getProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, Package, Shield, Truck } from "lucide-react";

export default async function Home() {
  const products = await getProducts();
  const featuredProducts = products.filter((p) => p.oferta).slice(0, 4);

  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <section className="relative h-[500px] w-full bg-gradient-to-r from-blue-900 via-blue-800 to-teal-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557821552-17105176677c?w=1600&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-start relative z-10 text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Descubre el mundo <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">
              sin fronteras
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mb-8">
            Importamos lo mejor de China y el mundo directamente a Bolivia. 
            Precios bajos, calidad garantizada y pagos seguros.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/categoria/tecnologia"
              className="px-8 py-4 bg-white text-blue-900 font-bold rounded-full hover:bg-blue-50 transition-colors shadow-lg flex items-center gap-2"
            >
              Ver Productos <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/categoria/hogar"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors"
            >
              Mayoristas
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4">
            <div className="p-4 bg-blue-100 rounded-full text-blue-600">
              <Package className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Importación Directa</h3>
              <p className="text-gray-500 text-sm">Sin intermediarios, mejores precios.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4">
            <div className="p-4 bg-green-100 rounded-full text-green-600">
              <Truck className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Envíos a todo el país</h3>
              <p className="text-gray-500 text-sm">Santa Cruz, La Paz, Cochabamba.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4">
            <div className="p-4 bg-purple-100 rounded-full text-purple-600">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Compra Segura</h3>
              <p className="text-gray-500 text-sm">Pago QR y soporte personalizado.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Ofertas Destacadas</h2>
            <Link href="/categoria/todas" className="text-blue-600 font-medium hover:underline flex items-center gap-1">
                Ver todo <ArrowRight className="w-4 h-4"/>
            </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      {/* Categories Grid (Optional if wanted) */}
    </div>
  );
}
