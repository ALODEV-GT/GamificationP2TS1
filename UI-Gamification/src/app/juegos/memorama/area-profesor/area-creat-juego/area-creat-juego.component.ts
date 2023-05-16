import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MemoramaServiceService } from '../../services/memorama-service.service';
import { Tema } from '../../models/tema';
import { Pregunta } from '../../models/pregunta';
import { Respuesta } from '../../models/respuesta';

@Component({
  selector: 'app-area-creat-juego',
  templateUrl: './area-creat-juego.component.html',
  styleUrls: ['./area-creat-juego.component.css']
})
export class AreaCreatJuegoComponent implements OnInit {

  tema:Tema=new Tema()
  categoria=''
  respuesta1=''
  respuesta2=''
  respuesta3=''
  respuesta4=''
  respuesta5=''
  indexTem=-1

  constructor(private memoramaService:MemoramaServiceService, private router:Router) { }

  ngOnInit(): void {
  }

  crearGuardarJuego(){
    if (this.comprobarTitulo()) {
      this.memoramaService.saveUsurioSesion(this.tema).subscribe(
        (value: Tema) => {
          if (value != undefined) {
            Swal.fire({
              icon: 'success',
              title: 'Juego Creado con exito',
              text: 'Ya puedes generar una partida con el juego creado'
            })
            this.router.navigate(['profesor/memoramas-creados'])
          }
        }
      )
    }
  }

  guardarCategoria(){
    if (this.comprobarMinimosCategPregunta()) {
      const pregunteTemp:Pregunta= new Pregunta()
      pregunteTemp.pregunta=this.categoria
      pregunteTemp.respuestas=this.guardarRespuestas()
      this.tema.preguntas.push(pregunteTemp)
      if (this.tema.preguntas.length === 6) {
        Swal.fire({
          icon: 'success',
          title: 'Bien',
          text: 'Ya creaste 6 categorias, puedes crear el juego'
        })
      }
    }
  }

 
  guardarRespuestas():Respuesta[]{
    const respuestas:Respuesta[]=[]
    const respuesta1:Respuesta=new Respuesta()
    respuesta1.respuesta=this.respuesta1
    respuestas.push(respuesta1)
    const respuesta2:Respuesta=new Respuesta()
    respuesta2.respuesta=this.respuesta2
    respuestas.push(respuesta2)
    if (this.respuesta3 !== '') {
      const respuesta3:Respuesta=new Respuesta()
      respuesta3.respuesta=this.respuesta3
      respuestas.push(respuesta3)
    }
    if (this.respuesta4 !== '') {
      const respuesta4:Respuesta=new Respuesta()
      respuesta4.respuesta=this.respuesta4
      respuestas.push(respuesta4)
    }
    if (this.respuesta5 !== '') {
      const respuesta5:Respuesta=new Respuesta()
      respuesta5.respuesta=this.respuesta5
      respuestas.push(respuesta5)
    }
    this.limpiarform()
    return respuestas
  }

  comprobarMinimosCategPregunta():boolean{
    if (this.categoria==='') {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Tienes que llenar el campo de la categoria o pregunta'
      })
      return false
    } 

    if (this.respuesta1==='' || this.respuesta2==='') {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Tienes que llenar minimo 2 campos de Respuesta (1er campo y 2do campo)'
      })
      return false
    }
    return true
  }

  comprobarTitulo():boolean{
    if (this.tema.titulo === undefined || this.tema.titulo ==="") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Tienes que llenar el Campo del titulo o tema'
      })
      return false
    }
    if (this.tema.preguntas.length<3) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Tienes que crear minimo 3 categorias'
      })
      return false
    }
    return true
  }


  limpiarform(){
    this.categoria=''
    this.respuesta1=''
    this.respuesta2=''
    this.respuesta3=''
    this.respuesta4=''
    this.respuesta5=''
  }
}