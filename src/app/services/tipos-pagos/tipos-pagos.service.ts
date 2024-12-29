import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoPago } from 'src/app/models/tipo-pago/tipo-pago';

@Injectable({
  providedIn: 'root',
})
export class TiposPagosService {
  private API_URL = 'https://apicaja.junasoft.com/TipoPagos';

  constructor(private http: HttpClient) {}

  // MOSTRAR DATOS
  getAllData(): Observable<TipoPago[]> {
    return this.http.get<TipoPago[]>(this.API_URL);
  }
}
