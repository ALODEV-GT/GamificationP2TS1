import { MemoramaServiceService } from '../../services/memorama-service.service';
import { Tema } from '../../models/tema';
import { Pregunta } from '../../models/pregunta';
import { Respuesta } from '../../models/respuesta';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo-juego',
  templateUrl: './demo-juego.component.html',
  styleUrls: ['./demo-juego.component.css']
})
export class DemoJuegoComponent implements OnInit {

  mostrarFigura=false;
  classCSS1='searched-image'
  classCSS2='searched-image-incoreect'
  preguntas:Pregunta[]=[]
  respuestas:Respuesta[]=[]
  indexPregunta=0
  classCSSstatus:String=""
  incorrecto=false
  correcto=false
  juegoInciado=false


  constructor(private router:Router, private memoramaService:MemoramaServiceService) { }

  async ngOnInit(): Promise<void> {
    this.classCSSstatus=this.classCSS1
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

  async clickTarjeta(index:number) : Promise<void>{
    if (this.juegoInciado) {
      this.respuestas[index].mostrarFigura=false
      if (this.preguntas[this.indexPregunta].respuestas.indexOf(this.respuestas[index])!==-1) {
        //sumar puntos y sumar contador de respuestas y verificar si el contador de respuestas es igual a la cantidad de respuestas de la pregunta
      } else {
        //esperar 1 segundo, voltear la tarjeto, descontar puntos
        await this.sleep(1000)
        this.respuestas[index].mostrarFigura=true
      }
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  async clickComenzar(): Promise<void> {
    if (!this.juegoInciado) {
      this.juegoInciado=true
      for (let i = 0; i < this.respuestas.length; i++) {
        const respuesta = this.respuestas[i];
        respuesta.mostrarFigura = true;
      }
      this.preguntas[this.indexPregunta].mostrarFigura = true;
      }
  }
  




}
