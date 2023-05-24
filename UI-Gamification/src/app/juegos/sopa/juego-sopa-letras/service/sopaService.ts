import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { historialSopa } from '../models/historialSopa';
import { palabraBD } from '../models/palabraBD';
import { puntuacionSopa } from '../models/puntuacionSopa';
import { titulo } from '../models/titulo';


@Injectable({
    providedIn: 'root'
  })



export class sopaJuegoService{

    readonly API_URL = 'http://localhost:3000/api/sopa/';

    constructor(private httpClient: HttpClient) { }

    public getPreguntasJuego(id_tema:number):Observable<palabraBD[]>{
        return this.httpClient.get<palabraBD[]>(this.API_URL+'get-palabras?id='+id_tema)
      }


     public getTitulos(id_tema:number){
      return this.httpClient.get<palabraBD[]>(this.API_URL+'get-titulos?id='+id_tema)

     } 


     public getTituloInstancia(id_tema:number){
      return this.httpClient.get<titulo>(this.API_URL+'titulo-instancia?id='+id_tema)
     } 


     public saveHistorial(creacion:historialSopa): Observable<historialSopa>{
      return this.httpClient.post<historialSopa>(this.API_URL+'save-historial',creacion)
    }
    


    public getHistorial(){
      return this.httpClient.get<puntuacionSopa[]>(this.API_URL+'listar-historial')
     } 


      
}