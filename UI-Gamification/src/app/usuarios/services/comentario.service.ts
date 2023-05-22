import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comentario } from 'src/models/Comentarios/Comentario';
import { Observable } from 'rxjs';
import { ComentarioI } from 'src/models/interfaces/ComentarioI';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private baseUrl: string = "http://localhost:3000/api/comentarios/";

  constructor(
    private http: HttpClient,
  ) {

  }

  guardarComentario(aula: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(`${this.baseUrl}guardar`, aula);
  }

  getComentarios(idPublicacion: number): Observable<ComentarioI[]> {
    return this.http.get<ComentarioI[]>(`${this.baseUrl}comentarios?id_publicacion=${idPublicacion}`)
  }

  getNumComentarios(idPublicacion: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}cantidad?id_publicacion=${idPublicacion}`)
  }

}
