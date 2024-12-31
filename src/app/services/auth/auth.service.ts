import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'https://apicaja.junasoft.com/LoginUsuario';

  private API_URL_RESETEO = 'https://apicaja.junasoft.com/ReseteoClave';

  private API_URL_REGISTRAR_ADMIN =
    'https://apicaja.junasoft.com/RegistrarUsuariosAdministrativos';

  private API_URL_LOGOUT = 'https://apicaja.junasoft.com/LogoutUsuario';

  private API_URL_OLVIDE_CLAVE = 'https://apicaja.junasoft.com/OlvideClave';

  constructor(private http: HttpClient) {}

  login(email: string, clave: string): Observable<any> {
    return this.http.post(this.API_URL, { email, clave });
  }

  registrarAdmin(
    nombre: string,
    email: string,
    clave: string
  ): Observable<any> {
    return this.http.post(this.API_URL_REGISTRAR_ADMIN, {
      nombre,
      email,
      clave,
    });
  }

  logout(): Observable<any> {
    localStorage.removeItem('token');

    return this.http.post(this.API_URL_LOGOUT, {});
  }

  olvideClave(email: string): Observable<any> {
    return this.http.post<any>(
      `${this.API_URL_OLVIDE_CLAVE}?email=${email}`,
      null,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  reseteoClave(userHasheado: string, claveNueva: string): Observable<any> {
    const url = `${this.API_URL_RESETEO}?userHasheado=${encodeURIComponent(
      userHasheado
    )}&claveNueva=${encodeURIComponent(claveNueva)}`;
    return this.http.post<any>(url, {});
  }
}
