import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta } from 'src/app/models/venta/venta';

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  private API_URL =
    'https://apicaja.junasoft.com/MovimientosCaja/IngresosDelDia';

  private API_URL_VENTAS = 'https://apicaja.junasoft.com/Ventas';

  private API_URL_FACTURACION_MES =
    'https://apicaja.junasoft.com/MovimientosCaja/FacturacionDelMes';

  constructor(private http: HttpClient) {}

  // MOSTRAR DATOS
  getAllData(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.API_URL);
  }

  // MOSTRAR DATOS VENTAS
  getAllDataVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.API_URL_VENTAS);
  }

  // MOSTRAR DATOS FACTUACION DELMES
  getAllFacturacionDelMes(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.API_URL_FACTURACION_MES);
  }

  // ACTUALIZAR VENTA
  updateData(venta: Venta): Observable<Venta> {
    return this.http.put<Venta>(
      `${this.API_URL_VENTAS}/${venta.idVenta}`,
      venta
    );
  }

  // GET BY ID
  getDataById(id: number): Observable<Venta> {
    return this.http.get<Venta>(this.API_URL_VENTAS + '/' + id);
  }

  // ELIMINAR DATOS
  deleteData(venta: Venta): Observable<Venta[]> {
    return this.http.delete<Venta[]>(this.API_URL_VENTAS + '/' + venta.idVenta);
  }

  // addData(
  //   idVenta: number,
  //   totalFactura: number,
  //   idTipoPago: string,
  //   idUsuario: number | null,
  //   lstDetalleVentas: string[]
  // ): Observable<Venta> {
  //   const formData: FormData = new FormData();

  //   formData.append('idVenta', idVenta.toString());
  //   formData.append('totalFactura', totalFactura.toString());
  //   formData.append('lstDetalleVentas', lstDetalleVentas.join(',')); // Convertimos el array a una cadena separada por comas
  //   // formData.append('cantidades', cantidades.join(',')); // Convertimos el array a una cadena separada por comas
  //   formData.append(
  //     'idUsuario',
  //     idUsuario !== null ? idUsuario.toString() : ''
  //   );

  //   formData.append('idTipoPago', idTipoPago.toString());

  //   return this.http.post<Venta>(this.API_URL_VENTAS, formData);
  // }
  addData(
    montoTotal: number,
    idTipoPago: number,
    idUsuario: number,
    lstDetalleVentas: { cantidad: number; idProducto: number }[]
  ): Observable<Venta> {
    const payload = {
      montoTotal,
      idTipoPago,
      idUsuario,
      lstDetalleVentas,
    };

    return this.http.post<Venta>(this.API_URL_VENTAS, payload);
  }
}
