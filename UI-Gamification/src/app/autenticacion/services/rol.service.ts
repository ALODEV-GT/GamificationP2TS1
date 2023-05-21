import { Rol } from '../../../models/usuarios/Rol';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  readonly API_URL = 'http://localhost:3000/api/rol/';
  constructor(private httpClient: HttpClient) { }

  public getRoles(): Observable<Rol[]>{
    return this.httpClient.get<Rol[]>(this.API_URL+'get-roles')
  }

}
