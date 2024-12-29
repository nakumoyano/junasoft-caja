import { TipoPago } from '../tipo-pago/tipo-pago';

export class Venta {
  idVenta: number;
  montoTotal: number;
  fechaHora: string;
  idTipoPago: number;
  tipoPago?: TipoPago;
  idUsuario: number;
  lstDetalleVentas: string[];
}
