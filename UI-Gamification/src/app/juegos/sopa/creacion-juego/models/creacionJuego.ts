export class creacionSopa{
codigo:string
titulo:string
id_user_creador:number
palabras:string[]
nivelSopa:string

constructor(codigo:string,titulo:string,id_user_creador:number,palabras:string[],nivelSopa:string){
    this.codigo=codigo;
    this.titulo=titulo;
    this.id_user_creador=id_user_creador;
    this.palabras=palabras;
    this.nivelSopa=nivelSopa;
    
}



}