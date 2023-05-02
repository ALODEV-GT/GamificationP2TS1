import { Pregunta } from './pregunta';
export class Tema {
    id!:number
    titulo!:string
    id_user_creador!:number
    cantidad_preguntas!:string
    preguntas:Pregunta[]=[]
}
