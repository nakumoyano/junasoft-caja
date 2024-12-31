import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/models/categoria/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private API_URL = 'https://apicaja.junasoft.com/Categorias';

  constructor(private http: HttpClient) {}

  // MOSTRAR DATOS
  getAllData(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.API_URL);
  }

  // CARGAR DATOS
  addData(idCategoria: number, nombre: string): Observable<Categoria> {
    const formData: FormData = new FormData();

    formData.append('idCategoria', idCategoria.toString());
    formData.append('nombre', nombre);

    return this.http.post<Categoria>(this.API_URL, formData);
  }

  // EDITAR DATOS
  // updateData(idCategoria: number, nombre: string): Observable<Categoria> {
  //   const formData: FormData = new FormData();

  //   formData.append('idCategoria', idCategoria.toString());
  //   formData.append('nombre', nombre);

  //   return this.http.put<Categoria>(`${this.API_URL}/${idCategoria}`, formData);
  // }
  updateData(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(
      this.API_URL + '/' + categoria.idCategoria,
      categoria
    );
  }

  // GET BY ID
  getDataById(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(this.API_URL + '/' + id);
  }

  // ELIMINAR DATOS
  deleteData(categoria: Categoria): Observable<Categoria[]> {
    return this.http.delete<Categoria[]>(
      this.API_URL + '/' + categoria.idCategoria
    );
  }
}
