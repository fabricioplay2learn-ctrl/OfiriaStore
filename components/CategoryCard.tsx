"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface CategoryCardProps {
  name: string;
  image: string;
  href: string;
  delay?: number;
}

export default function CategoryCard({ name, image, href, delay = 0 }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="group relative aspect-[4/5] md:aspect-square overflow-hidden rounded-2xl shadow-lg cursor-pointer"
    >
      <Link href={href} className="block w-full h-full">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0.8, x: 0 }}
            whileHover={{ x: 5, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-poppins text-lg md:text-xl font-bold text-white group-hover:text-gold transition-colors duration-300 capitalize">
              {name}
            </h3>
            <div className="h-0.5 w-12 bg-gold mt-2 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
