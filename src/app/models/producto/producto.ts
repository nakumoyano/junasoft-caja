import { Categoria } from '../categoria/categoria';
import { UnidadMedida } from '../unidad-medida/unidad-medida';

export class Producto {
  idProducto: number;
  nombre: string;
  sku: string;
  precioUnitario: number;
  idCategoria: number;
  categoria?: Categoria;
  idUnidadMedida: number;
  unidadMedida?: UnidadMedida;
}
