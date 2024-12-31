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

  private API_URL_FACTURACION_MES =
    'https://apicaja.junasoft.com/MovimientosCaja/FacturacionDelMes';

  constructor(private http: HttpClient) {}

  // MOSTRAR DATOS
  getAllData(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.API_URL);
  }

  // MOSTRAR DATOS FACTUACION DELMES
  getAllFacturacionDelMes(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.API_URL_FACTURACION_MES);
  }
}
