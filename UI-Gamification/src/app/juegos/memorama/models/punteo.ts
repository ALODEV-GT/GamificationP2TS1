import { PunteosReport } from './punteos-report';
export class Punteo {
    id!:number;
    id_instancia_juego!:number
    codigo_aula!:string
    id_usuario_juegador!:number
    dificultad!:string
    punteo!:number;
    punteosRepor:PunteosReport[]=[]
}
