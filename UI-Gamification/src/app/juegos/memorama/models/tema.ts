import { Pregunta } from './pregunta';
export class Tema {
    id:number=0
    titulo!:string
    id_user_creador:number=1
    cantidad_preguntas:number=0
    preguntas:Pregunta[]=[]
    dificultad:string='Facil'
    id_tipo_juego:number=3
    codigo_instancia_juego!:string
}
