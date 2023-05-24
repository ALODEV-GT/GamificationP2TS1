import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { creacionCurioso } from "../models/creacionCurioso";
import { curiosoPregunta } from "../models/curiosoPregunta";
import { historialCurioso } from "../models/historialCurioso";
import { opcionCurioso } from "../models/opcionCurioso";
import { preguntaCurioso } from "../models/preguntaCurioso";
import { puntuacionCurioso } from "../models/puntuacionCurioso";
import { tituloCurioso } from "../models/tituloCurioso";



@Injectable({
    providedIn: 'root'
  })




export class curiosoCreacionService{

    readonly API_URL = 'http://localhost:3000/api/curioso/';

    constructor(private httpClient: HttpClient) { }


    public saveCurioso(creacion:creacionCurioso): Observable<creacionCurioso>{
        return this.httpClient.post<creacionCurioso>(this.API_URL+'save-curioso',creacion)
      }
      
      public getTituloInstancia(id_tema:number){
        return this.httpClient.get<tituloCurioso>(this.API_URL+'get-titulo?id='+id_tema)
       } 
  
       public getPreguntasInstancia(id_tema:number){
        return this.httpClient.get<curiosoPregunta[]>(this.API_URL+'get-preguntas?id='+id_tema)
       } 
  

       public getOpcionesInstancia(id_tema:number){
        return this.httpClient.get<opcionCurioso[]>(this.API_URL+'get-opciones?id='+id_tema)
       } 
  



       public saveHistorial(creacion:historialCurioso): Observable<historialCurioso>{
        return this.httpClient.post<historialCurioso>(this.API_URL+'save-historial',creacion)
      }
      
  

    public getHistorial(){
      return this.httpClient.get<puntuacionCurioso[]>(this.API_URL+'listar-historial')
     } 


     public getHistorialAula(aula:string,instancia:number){
      return this.httpClient.get<puntuacionCurioso[]>(this.API_URL+'listar-historial?id='+aula+"&instancia="+instancia)
     } 










}