"use client";

import { useRef, useState } from "react";
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
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const cardWidth =
      carouselRef.current.querySelector<HTMLElement>("[data-card]")?.offsetWidth || 300;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeftPos(carouselRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeftPos - walk;
  };

  return (
    <section className="container mx-auto px-4 py-0">
      {/* Header */}
      <div className="flex items-end justify-between mb-2">
        <div>
          <h2 className="font-poppins text-lg md:text-xl font-semibold text-text-primary">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-text-muted mt-1">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
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

      {/* Carousel with side buttons */}
      <div className="relative group">
        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          aria-label="Anterior"
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-gold text-ceniza shadow-lg hover:bg-gold-bright transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className={`flex gap-3 overflow-x-auto pb-4 px-2 snap-x snap-mandatory scrollbar-hide items-stretch select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          {products.map((product) => (
            <div
              key={product.id}
              data-card
              className="min-w-[48%] sm:min-w-[45%] md:min-w-[23%] snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          aria-label="Siguiente"
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-gold text-ceniza shadow-lg hover:bg-gold-bright transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
