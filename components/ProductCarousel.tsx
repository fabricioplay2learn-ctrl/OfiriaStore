"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  products: Product[];
  href?: string;
}

export default function ProductCarousel({
  title,
  subtitle,
  products,
  href,
}: ProductCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;

    const cardWidth =
      carouselRef.current.querySelector<HTMLElement>("[data-card]")?.offsetWidth || 300;

    carouselRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="container mx-auto px-4 py-4 border-b border-white/5 last:border-0">
      {/* Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="font-poppins text-lg md:text-xl font-semibold text-text-primary">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-text-muted mt-1">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Desktop arrows */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              aria-label="Productos anteriores"
              className="p-2 rounded-full border border-white/10 hover:bg-white/5 transition text-white"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Siguientes productos"
              className="p-2 rounded-full border border-white/10 hover:bg-white/5 transition text-white"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {href && (
            <Link
              href={href}
              className="text-xs text-gold flex items-center gap-1 hover:underline font-medium"
            >
              Ver todo <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>

      {/* Carousel */}
      <motion.div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide items-stretch"
        whileTap={{ cursor: "grabbing" }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            data-card
            className="min-w-[75%] sm:min-w-[45%] md:min-w-[23%] snap-start"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
