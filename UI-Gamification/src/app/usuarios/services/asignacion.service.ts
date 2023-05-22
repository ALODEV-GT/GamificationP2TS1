import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Asignacion } from 'src/models/aulas/Asignacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {

  private baseUrl: string = "http://localhost:3000/api/asignaciones/";

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) {

  }

  guardarAsignacion(asignacion: Asignacion): Observable<Asignacion> {
    return this.http.post<Asignacion>(`${this.baseUrl}guardar`, asignacion);
  }
}
