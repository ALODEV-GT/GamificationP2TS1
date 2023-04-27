import { Usuario } from './../models/Usuario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  readonly API_URL = 'http://localhost:3000/api/users/';
  constructor(private httpClient: HttpClient) { }

  public getSesionUsuario(usuario:Usuario): Observable<Usuario>{
    return this.httpClient.get<Usuario>(this.API_URL+'get-user-sesion?nik_name='+usuario.nik_name+'&passworde='+usuario.passworde)
  }

  public saveUsurioSesion(usuario:Usuario): Observable<Usuario>{
    return this.httpClient.post<Usuario>(this.API_URL+'save-user',usuario)
  }
  
}
