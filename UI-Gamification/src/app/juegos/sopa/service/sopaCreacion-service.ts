import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { creacionSopa } from '../creacion-juego/models/creacionJuego';

@Injectable({
    providedIn: 'root'
  })



export class sopaCreacionService{

    readonly API_URL = 'http://localhost:3000/api/sopa/';

    constructor(private httpClient: HttpClient) { }


    public saveUsurioSesion(creacion:creacionSopa): Observable<creacionSopa>{
        return this.httpClient.post<creacionSopa>(this.API_URL+'save-sopa',creacion)
      }
      



}