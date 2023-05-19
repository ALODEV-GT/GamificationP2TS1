import { Respuesta } from '../models/respuesta';
import { Pregunta } from '../models/pregunta';
import { Tema } from '../models/tema';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemoramaServiceService {

  readonly API_URL = 'http://localhost:3000/api/memorama/';
  constructor(private httpClient: HttpClient) { }

  public saveMemorama(tema:Tema): Observable<Tema>{
    return this.httpClient.post<Tema>(this.API_URL+'save-game',tema)
  }
  
  public getTemaJuegosCreados(id:number):Observable<Tema[]>{
    return this.httpClient.get<Tema[]>(this.API_URL+'get-tema-juegos-creados?id='+id)
  }

  public getPreguntasJuego(id_tema:number):Observable<Pregunta[]>{
    return this.httpClient.get<Pregunta[]>(this.API_URL+'get-preguntas?id='+id_tema)
  }

  public getRespuestas(id_pregunta:number):Observable<Respuesta[]>{
    return this.httpClient.get<Respuesta[]>(this.API_URL+'get-respuestas?id='+id_pregunta)
  }

  

}
