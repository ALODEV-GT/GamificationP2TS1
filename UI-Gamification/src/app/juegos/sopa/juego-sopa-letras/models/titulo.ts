export class titulo{
    id:number
    id_instancia_juego:number
    titulo:string
    id_user_creador:number
    nivel:string


    constructor(id:number,id_instancia_juego:number,titulo:string,id_user_creador:number,nivel:string){
        this.id=id;
        this.id_instancia_juego=id_instancia_juego;
        this.titulo=titulo;
        this.id_user_creador=id_user_creador;
        this.nivel=nivel;

    }



}