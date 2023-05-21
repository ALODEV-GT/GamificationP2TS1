import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Publicacion } from 'src/models/publicaciones/Publicacion';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  private baseUrl: string = "http://localhost:3000/api/publicaciones/";

  constructor(
    private http: HttpClient,
  ) { }

  guardarPublicacion(publicacion: Publicacion): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}guardar`, publicacion);
  }

  getPublicaciones(codigoAula: string) {
    return this.http.get<Publicacion[]>(`${this.baseUrl}publicaciones?codigo_aula=${codigoAula}`)
  }
}
