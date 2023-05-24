export class palabraPosicion{
palabra:string
posiciones:[number,number][];
tachado:boolean=false;


constructor(palabra:string, posiciones:[number,number][]){
    this.palabra=palabra;
    this.posiciones=posiciones;
}

}