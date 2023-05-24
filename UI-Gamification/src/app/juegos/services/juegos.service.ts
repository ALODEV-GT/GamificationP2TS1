import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InstanciaJuego } from 'src/models/juegos/InstanciaJuego';
import { UsuarioService } from '../../usuarios/services/usuario.service';
import { Usuario } from 'src/models/usuarios/Usuario';
import { InstanciasJuegoI } from 'src/models/interfaces/Juego';
import { CompartirAula } from 'src/models/juegos/CompartirAula';
import { JuegoCompartidoI } from 'src/models/juegos/InterfacesJuego';

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

  public guardarCompartirAula(instancia: CompartirAula): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseURL}guardar-compartir-aula`, instancia)
  }

  public existeCompartirAula(idInstanciaJuego: number, codigoAula: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseURL}existe-compartir-aula?id_instancia_juego=${idInstanciaJuego}&codigo_aula=${codigoAula}`)
  }

  public getAllCompartirAula(codigoAula: string): Observable<JuegoCompartidoI[]> {
    return this.http.get<JuegoCompartidoI[]>(`${this.baseURL}all-compartir-aula?codigo_aula=${codigoAula}`)
  }

}
