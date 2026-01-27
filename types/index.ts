export interface Product {
  id: string;
  nombre: string;
  categoria: string;
  precioUnitario: number;
  precioMayor: number;
  moneda: "Bs";
  oferta: boolean;
  arancelCero: boolean;
  imagen: string;
  descripcion: string;
  negociable: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = "Tecnología" | "Hogar" | "Belleza" | "Accesorios" | "Otros";
