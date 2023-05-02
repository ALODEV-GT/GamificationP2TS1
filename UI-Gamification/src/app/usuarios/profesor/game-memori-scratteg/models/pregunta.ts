import { Respuesta } from './respuesta';
export class Pregunta {
    id!:number
    cantidad_respuestas!:number
    pregunta!:string
    respuestas:Respuesta[]=[]
    
}
