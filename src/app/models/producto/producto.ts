import { Categoria } from '../categoria/categoria';

export class Producto {
  idProducto: number;
  nombre: string;
  sku: string;
  precioUnitario: number;
  idCategoria: number;
  categoria?: Categoria;
}
