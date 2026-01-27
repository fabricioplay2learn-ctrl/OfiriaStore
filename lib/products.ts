import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    nombre: "Audífonos Bluetooth Noise Cancelling",
    categoria: "Tecnología",
    precioUnitario: 250,
    precioMayor: 180,
    moneda: "Bs",
    oferta: true,
    arancelCero: true,
    imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    descripcion: "Audífonos de alta calidad con cancelación de ruido activa.",
    negociable: true,
  },
  {
    id: "2",
    nombre: "Smartwatch Deportivo Pro",
    categoria: "Tecnología",
    precioUnitario: 180,
    precioMayor: 140,
    moneda: "Bs",
    oferta: false,
    arancelCero: true,
    imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    descripcion: "Smartwatch resistente al agua con monitoreo de salud.",
    negociable: true,
  },
  {
    id: "3",
    nombre: "Juego de Sábanas de Algodón Egipcio",
    categoria: "Hogar",
    precioUnitario: 320,
    precioMayor: 280,
    moneda: "Bs",
    oferta: true,
    arancelCero: false,
    imagen: "https://images.unsplash.com/photo-1522771753035-711989726f1d?w=800&q=80",
    descripcion: "Sábanas suaves y duraderas, 100% algodón.",
    negociable: true,
  },
  {
    id: "4",
    nombre: "Kit de Maquillaje Profesional",
    categoria: "Belleza",
    precioUnitario: 450,
    precioMayor: 380,
    moneda: "Bs",
    oferta: false,
    arancelCero: false,
    imagen: "https://images.unsplash.com/photo-1522335789203-abd6538d8ad1?w=800&q=80",
    descripcion: "Kit completo con sombras, labiales y brochas.",
    negociable: true,
  },
  {
    id: "5",
    nombre: "Mochila Antirrobo Impermeable",
    categoria: "Accesorios",
    precioUnitario: 120,
    precioMayor: 95,
    moneda: "Bs",
    oferta: true,
    arancelCero: true,
    imagen: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    descripcion: "Mochila segura con puerto USB y materiales resistentes.",
    negociable: true,
  },
  {
    id: "6",
    nombre: "Cámara de Seguridad WiFi",
    categoria: "Tecnología",
    precioUnitario: 190,
    precioMayor: 150,
    moneda: "Bs",
    oferta: false,
    arancelCero: true,
    imagen: "https://images.unsplash.com/photo-1558002038-1091773cc42f?w=800&q=80",
    descripcion: "Vigilancia 24/7 con visión nocturna y app móvil.",
    negociable: true,
  },
];

export async function getProducts() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return products;
}

export async function getProductById(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return products.find((p) => p.id === id);
}

export async function getProductsByCategory(category: string) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Simple case insenstive match
    return products.filter(p => p.categoria.toLowerCase() === category.toLowerCase());
}
