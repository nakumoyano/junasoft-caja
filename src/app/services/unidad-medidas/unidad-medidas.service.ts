import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnidadMedida } from 'src/app/models/unidad-medida/unidad-medida';

@Injectable({
  providedIn: 'root',
})
export class UnidadMedidasService {
  private API_URL = 'https://apicaja.junasoft.com/UnidadMedida';

  constructor(private http: HttpClient) {}

  // MOSTRAR DATOS
  getAllData(): Observable<UnidadMedida[]> {
    return this.http.get<UnidadMedida[]>(this.API_URL);
  }
}
