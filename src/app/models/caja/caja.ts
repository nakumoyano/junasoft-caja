import { TipoMovimiento } from '../tipo-movimiento/tipo-movimiento';
import { Usuario } from '../usuario/usuario';

export class Caja {
  idMovimiento: number;
  idTipoMovimiento?: number;
  tiposMovimientosCaja?: TipoMovimiento;
  descripcion: string;
  monto: number;
  fechaHora?: string;
  idUsuario: number;
  usuario?: Usuario;
}
