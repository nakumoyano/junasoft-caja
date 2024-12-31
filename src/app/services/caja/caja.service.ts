import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Caja } from 'src/app/models/caja/caja';

@Injectable({
  providedIn: 'root',
})
export class CajaService {
  private API_URL = 'https://apicaja.junasoft.com/MovimientosCaja'; //listo
  private API_URL_BY_DIA_ACTUAL =
    'https://apicaja.junasoft.com/MovimientosCaja/MovimientosDelDiaDeHoy';

  private API_URL_APETURA_CAJA =
    'https://apicaja.junasoft.com/MovimientosCaja/AperturaCaja'; //listo

  private API_URL_RETIRO_CAJA =
    'https://apicaja.junasoft.com/MovimientosCaja/RetiroCaja'; //listo

  private API_URL_CIERRE_CAJA =
    'https://apicaja.junasoft.com/MovimientosCaja/CierreCaja'; //listo

  private API_URL_BY_DIA_SELECCIONADO =
    'https://apicaja.junasoft.com/MovimientosCaja/MovimientosDelDiaSeleccionado';

  private API_URL_ESTADO_CAJA =
    'https://apicaja.junasoft.com/MovimientosCaja/EstadoCaja';

  private API_URL_FACTURADO_DIA =
    'https://apicaja.junasoft.com/MovimientosCaja/FacturacionDelDia';

  constructor(private http: HttpClient) {}

  // MOSTRAR DATOS
  getAll(): Observable<Caja[]> {
    return this.http.get<Caja[]>(this.API_URL);
  }

  // MOSTRAR DATOS FACTUDADO DEL DIA
  getFacturadoDelDia(): Observable<Caja[]> {
    return this.http.get<Caja[]>(this.API_URL_FACTURADO_DIA);
  }

  //ESTADO CAJA
  getEstadoCaja(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL_ESTADO_CAJA);
  }

  // MOSTRAR DATOS DEL DIA
  getAllDataDelDia(): Observable<Caja[]> {
    return this.http.get<Caja[]>(this.API_URL_BY_DIA_ACTUAL);
  }

  // CARGAR DATOS APERTURA CAJA
  addDataAperturaCaja(
    monto: number,
    idUsuario: number,
    descripcion: string
  ): Observable<any> {
    const url = `${
      this.API_URL_APETURA_CAJA
    }?monto=${monto.toString()}&idUsuario=${idUsuario.toString()}&descripcion=${descripcion}`;

    const formData: FormData = new FormData();

    return this.http.post<any>(url, formData);
  }

  // CARGAR DATOS RETIRO CAJA (listo)
  addDataRetiroCaja(
    monto: number,
    idUsuario: number,
    descripcion: string
  ): Observable<any> {
    const url = `${
      this.API_URL_RETIRO_CAJA
    }?monto=${monto.toString()}&idUsuario=${idUsuario.toString()}&descripcion=${descripcion}`;

    const formData: FormData = new FormData();

    return this.http.post<any>(url, formData);
  }

  // CARGAR DATOS CIERRE CAJA (listo)
  addDataCierreCaja(
    monto: number,
    idUsuario: number,
    descripcion: string
  ): Observable<any> {
    const url = `${
      this.API_URL_CIERRE_CAJA
    }?monto=${monto.toString()}&idUsuario=${idUsuario.toString()}&descripcion=${descripcion}`;

    const formData: FormData = new FormData();

    return this.http.post<any>(url, formData);
  }

  // ELIMINAR CAJA (listo)
  deleteData(caja: Caja): Observable<Caja[]> {
    return this.http.delete<Caja[]>(this.API_URL + '/' + caja.idMovimiento);
  }

  // MOVIMIENTO DIA SELECCIONADO (listo)
  getDataByDay(fecha: string): Observable<Caja[]> {
    const url = `${this.API_URL_BY_DIA_SELECCIONADO}?fecha=${fecha}`;
    return this.http.get<Caja[]>(url);
  }

  // GET BY ID (listo)
  getDataById(id: number): Observable<Caja> {
    return this.http.get<Caja>(this.API_URL + '/' + id);
  }

  // EDITAR DATOS (listo)
  updateDataCaja(caja: Caja): Observable<Caja> {
    return this.http.put<Caja>(this.API_URL + '/' + caja.idMovimiento, caja);
  }
}
