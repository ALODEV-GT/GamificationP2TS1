export class casillaLetra{
    letra:string
    select:boolean
    posiciones:[number,number][]=[];
    encontrado:boolean=false;
    constructor(numero:string,selec:boolean,){
        this.letra=numero;
        this.select=selec;

    }
} 