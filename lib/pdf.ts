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

const formatBs = (value: number) =>
  value.toLocaleString("es-BO", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function generateOrderPDF(order: OrderData, items: CartItem[]) {
  const doc = new jsPDF();
  const lineHeight = 10;
  let y = 20;

  // Header with Logo
  const logo = "/logo-ofiriastore.png";
  try {
     doc.addImage(logo, "PNG", 20, 10, 40, 15);
  } catch (e) {
     console.error("Error adding logo", e);
  }
  
  doc.setFontSize(20);
  doc.text("OfiriaStore - Nota de Pedido", 105, y + 5, { align: "center" }); // Adjusted y
  y += 25; // More space for logo

  // Formatted Date
  const dateObj = new Date(order.date);
  // Fallback if order.date is not parseable or already formatted
  const formattedDate = !isNaN(dateObj.getTime()) 
    ? dateObj.toLocaleDateString("es-BO", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : order.date;

  doc.setFontSize(12);
  doc.text(`Código: ${order.code}`, 20, y);
  doc.text(`Fecha: ${formattedDate}`, 140, y);
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
    // Page Break Logic
    if (y > 270) {
      doc.addPage();
      y = 20;
      // Re-draw header if needed, but for simplicity just continue
    }

    const price = item.quantity >= 3 && item.precioMayor > 0 ? item.precioMayor : item.precioUnitario;
    const subtotal = price * item.quantity;
    
    // Simple truncation for name
    const name = item.nombre.length > 40 ? item.nombre.substring(0, 40) + "..." : item.nombre;

    doc.text(name, 20, y);
    doc.text(item.quantity.toString(), 125, y, { align: "right" });
    doc.text(`${formatBs(price)} Bs`, 155, y, { align: "right" });
    doc.text(`${formatBs(subtotal)} Bs`, 185, y, { align: "right" });
    y += 8;
  });

  doc.line(20, y, 190, y);
  y += 8;

  // Total
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(`TOTAL: ${formatBs(order.total)} Bs`, 190, y, { align: "right" });
  y += 20;

  // Check for page break before footer
  if (y > 250) {
      doc.addPage();
      y = 20;
  }

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
