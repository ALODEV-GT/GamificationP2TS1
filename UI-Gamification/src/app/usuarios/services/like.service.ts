import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Like } from 'src/models/Likes/Like';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  private baseUrl: string = "http://localhost:3000/api/likes/";

  constructor(
    private http: HttpClient,
  ) {

  }

  guardarLike(aula: Like): Observable<Like> {
    return this.http.post<Like>(`${this.baseUrl}guardar`, aula);
  }

  dislike(idPublicacion: number, idUsuario: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}dislike?id_publicacion=${idPublicacion}&id_usuario=${idUsuario}`)
  }

  getNumLikes(idPublicacion: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}cantidad?id_publicacion=${idPublicacion}`)
  }

}
