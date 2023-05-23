import { Component, OnInit } from '@angular/core';
import { preguntaCurioso } from '../models/preguntaCurioso';

@Component({
  selector: 'app-creacion-juego-curioso',
  templateUrl: './creacion-juego-curioso.component.html',
  styleUrls: ['./creacion-juego-curioso.component.css']
})
export class CreacionJuegoCuriosoComponent implements OnInit {



  pregunta:string="";
  tituloPartida:string="";
  respuesta:string="";
  opcion1:string="";
  opcion2:string="";
  opcion3:string="";


  preguntas:preguntaCurioso[]=[]

  constructor() { }



  agregarPreguntas(){

    let arr:string[]=[];
    arr.push(this.opcion1);
    arr.push(this.opcion2);
    arr.push(this.opcion3);

    this.preguntas.push(new preguntaCurioso(this.pregunta,this.respuesta,arr))


    this.respuesta="";
    this.pregunta="";
    this.opcion1="";
    this.opcion2="";
    this.opcion3="";
    arr=[]


  }





  ngOnInit(): void {
  }

}
