"use client";

import PageBackground from "@/components/PageBackground";
import CategoryCard from "@/components/CategoryCard";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Tecnología",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    href: "/categoria/tecnologia",
  },
  {
    name: "Hogar",
    image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&q=80",
    href: "/categoria/hogar",
  },
  {
    name: "Accesorios",
    image: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?w=800&q=80",
    href: "/categoria/accesorios",
  },
  {
    name: "Moda",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80", // Fashion placeholder
    href: "/categoria/moda",
  },
  {
    name: "Belleza & Cuidado",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=800&q=80",
    href: "/categoria/belleza",
  },
  {
    name: "Deportes",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80", // Sports placeholder
    href: "/categoria/deportes",
  },
  {
    name: "Ofertas",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80", // Sale/Shopping bag placeholder
    href: "/ofertas",
  },
  {
    name: "Mayoristas",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80", // Warehouse/Boxes placeholder
    href: "/mayoristas",
  },
];

export default function CategoriasPage() {
  return (
    <PageBackground>
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-poppins text-3xl md:text-4xl font-bold text-text-primary mb-3"
          >
            Explora nuestras <span className="text-gold">Categorías</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-text-muted text-sm md:text-base"
          >
            Encuentra productos importados seleccionados especialmente para lo que necesitas hoy.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, index) => (
            <CategoryCard
              key={cat.name}
              name={cat.name}
              image={cat.image}
              href={cat.href}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </PageBackground>
  );
}
