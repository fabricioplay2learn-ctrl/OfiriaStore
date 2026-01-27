import jsPDF from "jspdf";
import { CartItem } from "@/types";

interface OrderData {
  code: string;
  date: string;
  customer: {
    name: string;
    lastname: string;
    ci: string;
    department: string;
    phone: string;
    refPhone?: string;
    email?: string;
  };
  total: number;
}

export function generateOrderPDF(order: OrderData, items: CartItem[]) {
  const doc = new jsPDF();
  const lineHeight = 10;
  let y = 20;

  // Header
  doc.setFontSize(20);
  doc.text("OfiriaStore - Nota de Pedido", 105, y, { align: "center" });
  y += 15;

  doc.setFontSize(12);
  doc.text(`Código: ${order.code}`, 20, y);
  doc.text(`Fecha: ${order.date}`, 140, y);
  y += 10;

  // Customer Info
  doc.setFontSize(14);
  doc.text("Datos del Cliente", 20, y);
  y += 8;
  doc.setFontSize(10);
  doc.text(`Nombre: ${order.customer.name} ${order.customer.lastname}`, 20, y);
  y += 6;
  doc.text(`CI: ${order.customer.ci} / ${order.customer.department}`, 20, y);
  y += 6;
  doc.text(`Celular: ${order.customer.phone}`, 20, y);
  if (order.customer.email) {
      y += 6;
      doc.text(`Email: ${order.customer.email}`, 20, y);
  }
  y += 15;

  // Items
  doc.setFontSize(14);
  doc.text("Detalle de Compra", 20, y);
  y += 10;
  
  // Table Header
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal"); 
  doc.setFont("helvetica", "bold");
  doc.text("Producto", 20, y);
  doc.text("Cant.", 120, y);
  doc.text("P.Unit", 140, y);
  doc.text("Subtotal", 170, y);
  doc.line(20, y + 2, 190, y + 2);
  y += 8;

  doc.setFont("helvetica", "normal");
  items.forEach((item) => {
    const price = item.quantity >= 3 && item.precioMayor > 0 ? item.precioMayor : item.precioUnitario;
    const subtotal = price * item.quantity;
    
    // Simple truncation for name
    const name = item.nombre.length > 40 ? item.nombre.substring(0, 40) + "..." : item.nombre;

    doc.text(name, 20, y);
    doc.text(item.quantity.toString(), 125, y, { align: "right" });
    doc.text(`${price} Bs`, 155, y, { align: "right" });
    doc.text(`${subtotal} Bs`, 185, y, { align: "right" });
    y += 8;
  });

  doc.line(20, y, 190, y);
  y += 8;

  // Total
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(`TOTAL: ${order.total} Bs`, 190, y, { align: "right" });
  y += 20;

  // Footer / QR Instruction
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Instrucciones de Pago:", 20, y);
  y += 6;
  doc.text("1. Escanea el QR de pago (en la web oficial).", 20, y);
  y += 6;
  doc.text("2. Envía este comprobante al WhatsApp +591 63921522.", 20, y);
  y += 10;
  doc.text("Gracias por tu compra en OfiriaStore.", 105, y, { align: "center" });

  doc.save(`OFI-${order.code}.pdf`);
}
