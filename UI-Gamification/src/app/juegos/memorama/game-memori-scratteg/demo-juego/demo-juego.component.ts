import { Respuesta } from '../models/respuesta';
import { Pregunta } from '../models/pregunta';
import { MemoramaServiceService } from '../services/memorama-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo-juego',
  templateUrl: './demo-juego.component.html',
  styleUrls: ['./demo-juego.component.css']
})
export class DemoJuegoComponent implements OnInit {

  mostrarFigura=false;
  calssS='searched-image'
  preguntas:Pregunta[]=[]
  respuestas:Respuesta[]=[]
  indexPregunta=0


  constructor(private router:Router, private memoramaService:MemoramaServiceService) { }

  async ngOnInit(): Promise<void> {
    this.preguntas = await this.memoramaService.getPreguntasJuego(4).toPromise();
    for (let i = 0; i < this.preguntas.length; i++) {
      const pregunta = this.preguntas[i];
      const respuestas = await this.memoramaService.getRespuestas(pregunta.id).toPromise();
      pregunta.respuestas = respuestas;
    }
    this.respuestas = this.preguntas.map(pregunta => pregunta.respuestas).reduce((a, b) => a.concat(b), []);
    this.respuestas.sort(() => Math.random() - 0.2);
  }
  
  

  clicMostrarFigura(index:number){
    this.preguntas[index].mostrarFigura = true
  }


  mostrarFig(){
    this.mostrarFigura=!this.mostrarFigura
  }

  clickTarjeta(index:number){
    this.respuestas[index].mostrarFigura=false
    if (this.preguntas[this.indexPregunta].respuestas.indexOf(this.respuestas[index])!==-1) {
      console.log("si es de la mimsa")
    } else {
      console.log("no es jalsdjfals ")
    }
  }


  async clickComenzar(): Promise<void> {
    for (let i = 0; i < this.respuestas.length; i++) {
      const respuesta = this.respuestas[i];
      respuesta.mostrarFigura = true;
    }
    this.preguntas[this.indexPregunta].mostrarFigura = true;
  }
  




}
