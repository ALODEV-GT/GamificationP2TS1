import { Tema } from './../models/tema';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemoramaServiceService {

  readonly API_URL = 'http://localhost:3000/api/memorama/';
  constructor(private httpClient: HttpClient) { }


  public saveUsurioSesion(tema:Tema): Observable<Tema>{
    return this.httpClient.post<Tema>(this.API_URL+'save-game',tema)
  }
}
