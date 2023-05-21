import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/models/usuarios/Usuario';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioSesion!: Usuario;

  readonly API_URL = 'http://localhost:3000/api/users/';
  constructor(private httpClient: HttpClient) { }

  public getSesionUsuario(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.API_URL + 'get-user-sesion?usuario=' + usuario.usuario + '&contrasena=' + usuario.contrasena).pipe(
      tap((resp: Usuario) => {
        if (resp) {
          if (resp.id_rol != undefined) {
            this.usuarioSesion = resp
            localStorage.clear();
            localStorage.setItem('autenticado', JSON.stringify(this.usuarioSesion));
          }
        }
      })
    )
  }

  public getUsuarioById(idUsuario: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.API_URL + 'usuario?id_usuario=' + idUsuario);
  }

  public saveUsurioSesion(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.API_URL + 'save-user', usuario).pipe(
      tap((resp: Usuario) => {
        if (resp) {
          if (resp.id_rol != undefined) {
            this.usuarioSesion = resp
            localStorage.clear();
            localStorage.setItem('autenticado', JSON.stringify(this.usuarioSesion));
          }
        }
      })
    )
  }

  public validateUser(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.API_URL + 'validate?usuario=' + usuario.usuario)
  }

  getUsuarioSesion(): Usuario | undefined {
    if (!this.usuarioSesion) {
      this.usuarioSesion = JSON.parse(localStorage.getItem('autenticado')!) || undefined;
    }
    return this.usuarioSesion;
  }

}
