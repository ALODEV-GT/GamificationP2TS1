import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comido } from '../models/Comido';
import { Punteo } from '../models/Punteo';
import { Rep1 } from 'src/models/juegos/InterfacesJuego';

@Injectable({
  providedIn: 'root'
})
export class ComidoService {

  baseURL: string = 'http://localhost:3000/api/comido/'

  constructor(
    private http: HttpClient
  ) { }


  public saveComido(comido: Comido): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseURL}save-game`, comido)
  }

  public guardarPunteo(punteo: Punteo): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseURL}guardar-punteo`, punteo)
  }

  public getConfigsGame(idInstanciaJuego: number): Observable<Comido> {
    return this.http.get<Comido>(`${this.baseURL}cofings-game?id_instancia_juego=${idInstanciaJuego}`)
  }

  public getPunteos(idInstanciaJuego: number): Observable<Rep1[]> {
    return this.http.get<Rep1[]>(`${this.baseURL}puntuaciones?id_instancia_juego=${idInstanciaJuego}`)
  }

}
