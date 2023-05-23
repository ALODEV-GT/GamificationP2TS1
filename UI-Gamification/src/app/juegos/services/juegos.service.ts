import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InstanciaJuego } from 'src/models/juegos/InstanciaJuego';
import { UsuarioService } from '../../usuarios/services/usuario.service';
import { Usuario } from 'src/models/usuarios/Usuario';
import { InstanciasJuegoI } from 'src/models/interfaces/Juego';

@Injectable({
  providedIn: 'root'
})
export class JuegosService {

  baseURL: string = 'http://localhost:3000/api/juegos/'

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) { }


  public guardarInstanciaJuego(instancia: InstanciaJuego): Observable<InstanciaJuego> {
    return this.http.post<InstanciaJuego>(`${this.baseURL}guardar-instancia-juego`, instancia)
  }

  public getInstanciasJuego(): Observable<InstanciasJuegoI[]> {
    const usuario: Usuario = this.usuarioService.getUsuarioSesion()!;
    return this.http.get<InstanciasJuegoI[]>(`${this.baseURL}instancias-juego?id_usuario_creador=${usuario.id_usuario}`)
  }

}
