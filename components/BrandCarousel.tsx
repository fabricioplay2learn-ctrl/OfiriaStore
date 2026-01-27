"use client";

const brands = [
  // China
  { name: "CHUWI", region: "CN", className: "font-black tracking-wider uppercase" },
  { name: "Xiaomi", region: "CN", className: "font-bold tracking-tight" },
  { name: "Anker", region: "CN", className: "font-extrabold tracking-wide uppercase" },
  { name: "Baseus", region: "CN", className: "font-bold tracking-widest uppercase" },
  { name: "Ugreen", region: "CN", className: "font-bold lowercase" },
  // USA / Global
  { name: "Apple", region: "US", className: "font-medium tracking-tight" },
  { name: "HP", region: "US", className: "font-bold italic uppercase" },
  { name: "Dell", region: "US", className: "font-black tracking-tight" },
  { name: "Nike", region: "US", className: "font-black italic tracking-tighter uppercase" },
  // Europe
  { name: "Adidas", region: "EU", className: "font-bold tracking-widest lowercase" },
  { name: "Puma", region: "EU", className: "font-extrabold uppercase" },
  { name: "ZARA", region: "EU", className: "font-bold tracking-widest uppercase" },
];

export default function BrandCarousel() {
  return (
    <section className="py-8 bg-carboncillo overflow-hidden relative border-y border-white/5">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .brand-container:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}} />

      {/* Context Copy */}
      <div className="container mx-auto px-4 mb-8 text-center">
        <p className="text-gold-champan text-xs md:text-sm uppercase tracking-[0.2em] font-medium">
          Importamos marcas reconocidas del mundo
        </p>
      </div>

      {/* Gradient Masks */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-carboncillo to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-carboncillo to-transparent z-10" />

      <div className="flex brand-container">
        <div className="flex gap-12 md:gap-24 items-center whitespace-nowrap px-4 animate-marquee will-change-transform">
          {/* Quadruple the list for robust infinite loop on large screens */}
          {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="group cursor-default flex items-center justify-center gap-2 relative"
            >
              <span className={`text-xl md:text-2xl text-text-muted/60 group-hover:text-gold transition-all duration-300 font-poppins ${brand.className}`}>
                {brand.name}
              </span>
              
              {/* Flag tooltip on hover */}
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -top-6 left-1/2 -translate-x-1/2 text-sm">
                {brand.region === "CN" && "🇨🇳"}
                {brand.region === "US" && "🇺🇸"}
                {brand.region === "EU" && "🇪🇺"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
