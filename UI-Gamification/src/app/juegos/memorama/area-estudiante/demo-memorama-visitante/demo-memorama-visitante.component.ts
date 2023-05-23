import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Pregunta } from '../../models/pregunta';
import { Respuesta } from '../../models/respuesta';
import { Tema } from '../../models/tema';
import { MemoramaServiceService } from '../../services/memorama-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demo-memorama-visitante',
  templateUrl: './demo-memorama-visitante.component.html',
  styleUrls: ['./demo-memorama-visitante.component.css']
})
export class DemoMemoramaVisitanteComponent implements OnInit {


  mostrarFigura=false;
  classCSS1=  'searched-image'
  classCSS2='searched-image-incoreect'
  preguntas:Pregunta[]=[]
  respuestas:Respuesta[]=[]
  indexPregunta=0
  juegoInciado=false
  punteoGeneral=0
  tema:Tema= new Tema()
  coeficienteDificultad:number=0.7
  
  constructor(private router:ActivatedRoute, private memoramaService:MemoramaServiceService,
    private routes:Router) { }

  async ngOnInit(): Promise<void> {
    this.tema.id=1
    this.tema = await this.memoramaService.getMemorama(this.tema.id).toPromise();
    this.calculoDififultad()
    this.preguntas = await this.memoramaService.getPreguntasJuego(this.tema.id).toPromise();
    for (let i = 0; i < this.preguntas.length; i++) {
      const pregunta = this.preguntas[i];
      const respuestas = await this.memoramaService.getRespuestas(pregunta.id).toPromise();
      pregunta.respuestas = respuestas;
      pregunta.respuestas.forEach(pregunta => {
        pregunta.classCSSstatus=this.classCSS1
        pregunta.puntos = 10
      });
    }
    this.respuestas = this.preguntas.map(pregunta => pregunta.respuestas).reduce((a, b) => a.concat(b), []);
    this.respuestas.sort(() => Math.random() - this.coeficienteDificultad);
    this.preguntas.sort(() => Math.random() - 0.5);
  }



  clicMostrarFigura(index:number){
    this.preguntas[index].mostrarFigura = true
  }


  mostrarFig(){
    this.mostrarFigura=!this.mostrarFigura
  }


  async clickTarjeta(index:number) : Promise<void>{
    if (this.juegoInciado && this.respuestas[index].mostrarFigura) {
      this.respuestas[index].mostrarFigura=false
      if (this.preguntas[this.indexPregunta].respuestas.indexOf(this.respuestas[index])!==-1) {
        //sumar puntos y restar contador de respuestas y verificar si el contador de respuestas es igual a la cantidad de respuestas de la pregunta
        this.respuestas[index].correcto=true
        this.respuestas[index].classCSSstatus=this.classCSS1
        this.aumentarPuntos(index)
        this.mostarSiguientepregunta()
      } else {
        //esperar 1 segundo, voltear la tarjeto, descontar puntos
        this.respuestas[index].classCSSstatus=this.classCSS2
        this.descontarPuntosTarjeta(index)
        await this.sleep(1000)
        this.respuestas[index].mostrarFigura=true
      }
    }
  }

  private calculoDififultad(){
    switch (this.tema.dificultad) {
      case 'Facil':
        this.coeficienteDificultad = 0.7
        break;
      case 'Dificil':
        this.coeficienteDificultad = 0.2
        break;
      case 'Medio':
        this.coeficienteDificultad = 0.5
        break;
    
      default:
        break;
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private descontarPuntosTarjeta(index:number){
    if (this.respuestas[index].puntos>3) {
      this.respuestas[index].puntos = this.respuestas[index].puntos-3
    }
  }

  private aumentarPuntos(index:number){
    this.punteoGeneral +=this.respuestas[index].puntos
    this.preguntas[this.indexPregunta].cantidad_respuestas -= 1
  }

  private respuestasCompletadas():boolean{
    return (this.preguntas[this.indexPregunta].cantidad_respuestas === 0)
  }

  private mostarSiguientepregunta(){
    if (this.respuestasCompletadas()) {
      this.indexPregunta++
      if (this.indexPregunta < this.preguntas.length ) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Completado! siguiente Categoria :'+this.preguntas[this.indexPregunta].pregunta,
          showConfirmButton: false,
          timer: 2000
        })
        this.preguntas[this.indexPregunta].mostrarFigura = true;
      }else{
        this.routes.navigate(['inicio/principal'])
        Swal.fire({
          icon: 'success',
          title: 'Exelente juego',
          text: 'Juego Terminado tu Puntuacion es: '+this.punteoGeneral,
        })
        this.indexPregunta=0
      }
    }
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
