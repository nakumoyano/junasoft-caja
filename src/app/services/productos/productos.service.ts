import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/models/producto/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private API_URL = 'https://apicaja.junasoft.com/Productos';

  constructor(private http: HttpClient) {}

  // MOSTRAR DATOS
  getAllData(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.API_URL);
  }

  // CARGAR DATOS
  addData(
    idProducto: number,
    nombre: string,
    sku: string,
    precioUnitario: number,
    idCategoria: number,
    idUnidadMedida: number
  ): Observable<Producto> {
    const formData: FormData = new FormData();

    formData.append('idProducto', idProducto.toString());
    formData.append('nombre', nombre);
    // formData.append('sku', sku.toString());
    formData.append('idCategoria', idCategoria.toString());
    formData.append('idUnidadMedida', idUnidadMedida.toString());

    if (sku !== null && sku !== undefined) {
      formData.append('sku', sku.toString());
    }
    if (precioUnitario !== null && precioUnitario !== undefined) {
      formData.append('precioUnitario', precioUnitario.toString());
    }

    return this.http.post<Producto>(this.API_URL, formData);
  }

  // EDITAR DATOS
  // updateData(
  //   idProducto: number,
  //   nombre: string,
  //   sku: string,
  //   precioUnitario: number,
  //   idCategoria: number,
  //   idUnidadMedida: number
  // ): Observable<Producto> {
  //   const formData: FormData = new FormData();

  //   formData.append('idProducto', idProducto.toString());
  //   formData.append('nombre', nombre);
  //   formData.append('sku', sku);
  //   formData.append('idCategoria', idCategoria.toString());
  //   formData.append('idUnidadMedida', idUnidadMedida.toString());

  //   if (precioUnitario !== null && precioUnitario !== undefined) {
  //     formData.append('precioUnitario', precioUnitario.toString());
  //   }

  //   return this.http.put<Producto>(`${this.API_URL}/${idProducto}`, formData);
  // }
  updateData(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(
      `${this.API_URL}/${producto.idProducto}`,
      producto
    );
  }

  // GET BY ID
  getDataById(id: number): Observable<Producto> {
    return this.http.get<Producto>(this.API_URL + '/' + id);
  }

  // ELIMINAR DATOS
  deleteData(producto: Producto): Observable<Producto[]> {
    return this.http.delete<Producto[]>(
      this.API_URL + '/' + producto.idProducto
    );
  }
}
