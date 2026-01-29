export interface Product {
  id: string;
  nombre: string;
  categoria: string;
  precioUnitario: number;
  precioMayor: number;
  minMayor: number;
  moneda: "Bs";
  oferta: boolean;
  arancelCero: boolean;
  imagen: string;
  descripcion: string;
  negociable: boolean;
  porTemporada?: boolean;
  masVendido?: boolean;
  nuevo?: boolean;
  descuento?: boolean;
  promocion?: boolean;
  combo?: boolean;
  mayorVenta?: boolean;
  masSolicitado?: boolean;
  nuevaMarca?: boolean;
  nuevoModelo?: boolean;
  interesante?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = "Tecnología" | "Hogar" | "Belleza" | "Accesorios" | "Otros";