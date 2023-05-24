import { preguntaCurioso } from "./preguntaCurioso"

export class creacionCurioso{
    titulo:string
    id_user_creador:number
    id_tipo_juego:number=4;
    preguntas:preguntaCurioso[]


    constructor(titulo:string,id_user_creador:number,preguntas:preguntaCurioso[]){
        this.titulo=titulo;
        this.id_user_creador=id_user_creador;
        this.preguntas=preguntas;
    }



}