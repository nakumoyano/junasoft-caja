import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoMovimiento } from 'src/app/models/tipo-movimiento/tipo-movimiento';

@Injectable({
  providedIn: 'root',
})
export class TiposMovimientosService {
  private API_URL = 'https://apicaja.junasoft.com/TiposMovimientosCaja';

  constructor(private http: HttpClient) {}

  // MOSTRAR DATOS
  getAllData(): Observable<TipoMovimiento[]> {
    return this.http.get<TipoMovimiento[]>(this.API_URL);
  }
}
