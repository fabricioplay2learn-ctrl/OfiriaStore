import PageBackground from "@/components/PageBackground";
import { ArrowRight, Tag, Percent, Calendar } from "lucide-react";
import Link from "next/link";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";

export default function ProductosPage() {
  // Show all products
  const allProducts = products;

  return (
    <PageBackground>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="font-poppins text-3xl md:text-5xl font-bold mb-3 text-text-primary">
              Nuestros <span className="text-gold">Productos</span>
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl">
              Explora nuestra colección completa de productos importados de alta calidad.
            </p>
          </div>
        </div>
        
        {allProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allProducts.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-bg-card border border-border-custom rounded-xl p-12 flex flex-col items-center justify-center text-center min-h-[300px]">
            <p className="text-text-muted mb-4 text-xl">No hay productos disponibles en este momento.</p>
            <Link href="/" className="text-gold hover:underline flex items-center gap-2">
              Volver al inicio <ArrowRight className="w-4 h-4"/>
            </Link>
          </div>
        )}
      </div>
    </PageBackground>
  );
}
