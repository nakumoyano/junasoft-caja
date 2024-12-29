import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private API_URL = 'https://apicaja.junasoft.com.junasoft.com/Usuarios';
  private API_URL_POR_EMAIL = 'https://apicaja.junasoft.com/UsuariosPorEmail';
  private API_URL_UPDATE_PROFILE = 'https://apicaja.junasoft.com/CambioPerfil';
  private API_URL_REGISTRAR_ADMIN =
    'https://apicaja.junasoft.com/RegistrarUsuario';
  private API_URL_CHANGE_PASSWORD =
    'https://apicaja.junasoft.com/ReseteoClaveLogueado';

  constructor(private http: HttpClient) {}

  // MOSTRAR DATOS ADMIN
  // getAllData(): Observable<Usuario[]> {
  //   return this.http.get<Usuario[]>(this.API_URL_ADMINISTRADORES);
  // }
  // OBTENER DATOS DE ADMIN POR EMAIL
  getUserByEmail(): Observable<any> {
    const email = localStorage.getItem('email');
    return this.http.get(`${this.API_URL_POR_EMAIL}?email=${email}`);
  }

  updateProfile(email: string, nombreCompleto: string): Observable<any> {
    const url = `${this.API_URL_UPDATE_PROFILE}?email=${encodeURIComponent(
      email
    )}&nombreCompleto=${encodeURIComponent(nombreCompleto)}`;

    return this.http.post<any>(url, {});
  }

  changePassword(email: string, claveNueva: string): Observable<any> {
    const url = `${this.API_URL_CHANGE_PASSWORD}?email=${encodeURIComponent(
      email
    )}&claveNueva=${encodeURIComponent(claveNueva)}`;

    return this.http.post<any>(url, {});
  }

  addData(
    nombreCompleto: string,
    email: string,
    clave: string
  ): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('nombreCompleto', nombreCompleto);
    formData.append('email', email);
    formData.append('clave', clave);

    return this.http.post<any>(this.API_URL_REGISTRAR_ADMIN, formData);
  }

  // EDITAR DATOS ADMIN
  // updateData(admin: any): Observable<any> {
  //   return this.http.put<any>(
  //     this.API_URL_ADMINISTRADORES + '/' + admin.idUsuario,
  //     admin
  //   );
  // }
  // GET BY ID
  getDataById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.API_URL + '/' + id);
  }

  // ELIMINAR DATOS
  deleteData(user: Usuario): Observable<Usuario[]> {
    return this.http.delete<Usuario[]>(this.API_URL + '/' + user.idUsuario);
  }
}
