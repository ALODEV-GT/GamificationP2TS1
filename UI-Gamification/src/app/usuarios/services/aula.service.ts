import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aula } from 'src/models/aulas/Aula';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  private baseUrl: string = "http://localhost:3000/api/aulas/";

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) {

  }

  guardarAula(aula: Aula): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}crear-nuevo`, aula);
  }

  existeAula(codigoAula: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}existe?codigo_aula=${codigoAula}`)
  }


  getAulaByCodigo(codigoAula: string): Observable<Aula> {
    return this.http.get<Aula>(`${this.baseUrl}aula?codigo_aula=${codigoAula}`)
  }

  getMisAulasProfesor() {
    const id_usuario = this.usuarioService.getUsuarioSesion()?.id_usuario;
    return this.http.get<Aula[]>(`${this.baseUrl}mis-aulas-profesor?id_usuario=${id_usuario}`)
  }

  getMisAulasEstudiante() {
    const id_usuario = this.usuarioService.getUsuarioSesion()?.id_usuario;
    return this.http.get<Aula[]>(`${this.baseUrl}mis-aulas-estudiante?id_usuario=${id_usuario}`)
  }
}
