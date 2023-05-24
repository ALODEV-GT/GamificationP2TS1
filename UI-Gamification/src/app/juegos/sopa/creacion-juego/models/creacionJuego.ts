export class creacionSopa{
titulo:string
id_user_creador:number
id_tipo_juego:number=2;
palabras:string[]
nivelSopa:string

constructor(titulo:string,id_user_creador:number,palabras:string[],nivelSopa:string){
    this.titulo=titulo;
    this.id_user_creador=id_user_creador;
    this.palabras=palabras;
    this.nivelSopa=nivelSopa;
    
}



}