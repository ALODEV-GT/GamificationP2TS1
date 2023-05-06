import { Respuesta } from './respuesta';
export class Pregunta {
    id:number=0
    cantidad_respuestas:number=0
    pregunta!:string
    respuestas:Respuesta[]=[]
    mostrarFigura=false
}
