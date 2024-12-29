import { TipoMovimiento } from '../tipo-movimiento/tipo-movimiento';
import { Usuario } from '../usuario/usuario';

export class Caja {
  idCaja: number;
  idTipoMovimiento?: number;
  tipoMovimiento?: TipoMovimiento;
  descripcion: string;
  monto: number;
  fechaMovimiento?: string;
  idUsuario: number;
  usuario?: Usuario;
}
