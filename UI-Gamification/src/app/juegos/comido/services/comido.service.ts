import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comido } from '../models/Comido';

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

}
