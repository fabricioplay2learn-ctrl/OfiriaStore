import { Product } from "@/types";

export function generateWhatsAppLink(product: Product, quantity: number = 1, isWholesale: boolean = false) {
  // TODO: Replace with environment variable or config
  const phone = "59170000000"; 
  
  const type = isWholesale ? "Al por mayor" : "Unidad";
  const price = isWholesale ? product.precioMayor : product.precioUnitario;
  
  const message = `Hola OfiriaStore 👋
Quiero negociar este producto:

📦 Producto: ${product.nombre}
📂 Categoría: ${product.categoria}
💰 Precio referencia: ${price} Bs
📦 Tipo: ${type}
🔢 Cantidad: ${quantity}`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
