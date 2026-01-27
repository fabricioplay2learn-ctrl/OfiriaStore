"use client";

import Link from "next/link";
import { getProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, Package, Shield, Truck } from "lucide-react";
import { motion } from "framer-motion";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

// Need to make this a client component for animations
// We'll fetch products differently

export default function Home() {
  return <HomeContent />;
}

function HomeContent() {
  // For now using static data, in production would use server component + client wrapper
  const featuredProducts = [
    {
      id: "1",
      nombre: "Audífonos Bluetooth Noise Cancelling",
      categoria: "Tecnología",
      precioUnitario: 250,
      precioMayor: 180,
      moneda: "Bs" as const,
      oferta: true,
      arancelCero: true,
      imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      descripcion: "Audífonos de alta calidad con cancelación de ruido activa.",
      negociable: true,
    },
    {
      id: "3",
      nombre: "Juego de Sábanas de Algodón Egipcio",
      categoria: "Hogar",
      precioUnitario: 320,
      precioMayor: 280,
      moneda: "Bs" as const,
      oferta: true,
      arancelCero: false,
      imagen: "https://images.unsplash.com/photo-1522771753035-711989726f1d?w=800&q=80",
      descripcion: "Sábanas suaves y duraderas, 100% algodón.",
      negociable: true,
    },
    {
      id: "5",
      nombre: "Mochila Antirrobo Impermeable",
      categoria: "Accesorios",
      precioUnitario: 120,
      precioMayor: 95,
      moneda: "Bs" as const,
      oferta: true,
      arancelCero: true,
      imagen: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      descripcion: "Mochila segura con puerto USB y materiales resistentes.",
      negociable: true,
    },
    {
      id: "2",
      nombre: "Smartwatch Deportivo Pro",
      categoria: "Tecnología",
      precioUnitario: 180,
      precioMayor: 140,
      moneda: "Bs" as const,
      oferta: false,
      arancelCero: true,
      imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      descripcion: "Smartwatch resistente al agua con monitoreo de salud.",
      negociable: true,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <section className="relative h-[500px] w-full bg-gradient-to-br from-ceniza via-carboncillo to-ceniza overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557821552-17105176677c?w=1600&q=80')] bg-cover bg-center opacity-5"></div>
        {/* Gold accent glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-3xl"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto px-4 h-full flex flex-col justify-center items-start relative z-10"
        >
          <div className="max-w-3xl">
            <h1 className="font-poppins text-5xl md:text-7xl font-semibold mb-6 tracking-tight text-text-primary">
              Descubre el mundo <br />
              <span className="text-gold-gradient">
                sin fronteras
              </span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mb-8 leading-relaxed">
              Importamos lo mejor de China y el mundo, directo a Bolivia.
              <span className="text-gold"> Precios bajos, calidad garantizada y pagos seguros. </span>
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="/categoria/tecnologia"
                animate={{ 
                  scale: [1, 1.03, 1],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ scale: 1.06 }}
                className="px-8 py-4 btn-gold rounded-full shadow-gold flex items-center gap-2"
              >
                Ver Productos <ArrowRight className="w-5 h-5" />
              </motion.a>
              <Link
                href="/categoria/hogar"
                className="px-8 py-4 btn-outline-gold rounded-full transition-all duration-300 hover:bg-gold/10"
              >
                Mayoristas
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
            className="card-luxury p-6 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="p-4 bg-gold/20 rounded-full text-gold">
              <Package className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-poppins font-semibold text-lg text-text-primary">Importación Directa</h3>
              <p className="text-text-muted text-sm">Sin intermediarios, mejores precios.</p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card-luxury p-6 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="p-4 bg-gold/20 rounded-full text-gold">
              <Truck className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-poppins font-semibold text-lg text-text-primary">Envíos a todo el país</h3>
              <p className="text-text-muted text-sm">Santa Cruz, La Paz, Cochabamba.</p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card-luxury p-6 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="p-4 bg-gold/20 rounded-full text-gold">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-poppins font-semibold text-lg text-text-primary">Compra Segura</h3>
              <p className="text-text-muted text-sm">Pago QR y soporte personalizado.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-poppins text-3xl font-semibold text-text-primary">Ofertas <span className="text-gold">Destacadas</span></h2>
          <Link href="/categoria/todas" className="text-gold font-medium hover:underline flex items-center gap-1">
            Ver todo <ArrowRight className="w-4 h-4"/>
          </Link>
        </div>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        >
          {featuredProducts.filter(p => p.oferta).slice(0, 4).map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Floating WhatsApp */}
      <FloatingWhatsApp />
    </div>
  );
}
