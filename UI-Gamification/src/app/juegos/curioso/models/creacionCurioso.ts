import { preguntaCurioso } from "./preguntaCurioso"

export class creacionCurioso{
    titulo:string
    preguntas:preguntaCurioso[]


    constructor(titulo:string,preguntas:preguntaCurioso[]){
        this.titulo=titulo;
        this.preguntas=preguntas;
    }



}