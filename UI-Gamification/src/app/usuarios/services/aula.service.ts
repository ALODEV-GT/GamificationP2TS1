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

  validarCodigoAula(codigoAula: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}validar?codigo_aula=${codigoAula}`)
  }

  getMisAulas() {
    const id_usuario = this.usuarioService.getUsuarioSesion()?.id_usuario;
    return this.http.get<Aula[]>(`${this.baseUrl}mis-aulas?id_usuario=${id_usuario}`)
  }
}
