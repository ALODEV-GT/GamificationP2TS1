import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuarios/services/usuario.service';
import { Usuario } from 'src/models/usuarios/Usuario';
import { SesionService } from 'src/service/sesion.service';
import Swal from 'sweetalert2';
import { sopaCreacionService } from '../service/sopaCreacion-service';
import { casilla } from './models/casilla';
import { creacionSopa } from './models/creacionJuego';

@Component({
  selector: 'app-creacion-juego',
  templateUrl: './creacion-juego.component.html',
  styleUrls: ['./creacion-juego.component.css']
})
export class CreacionJuegoComponent implements OnInit {

  
  nivelPartida:string="";
  codigo:string="";
  tituloPartida:string="";
  palabras:string[]=[];
  palabraNG="";
  descripcionNivel:string="";
  limite=0;
  constructor(private sopaService:sopaCreacionService,private usuarioService:UsuarioService,private router:Router) { 

  }



  agregarPalabra(){
    this.palabras.push(this.palabraNG);
    this.palabraNG="";
  }

  eliminarPalabra(index:number){
    this.palabras.splice(index,1);
  }

  cargarValor(){
  
    console.log(this.nivelPartida);
  }

  crearJuego(){
    if (this.palabras.length<5) {
      this.popError("palabras insuficientes")
    }else if(this.palabras.length===5){
      console.log(JSON.stringify(new creacionSopa(this.tituloPartida,1,this.palabras,this.nivelPartida)));
      let user:Usuario = this.usuarioService.getUsuarioSesion()!;
      this.sopaService.saveUsurioSesion(new creacionSopa(this.tituloPartida,user.id_usuario,this.palabras,this.nivelPartida)).subscribe((gen:creacionSopa)=>{
        console.log(gen)
        this.popAfirmation();
        this.router.navigate(['/profesor/creados'])
      })
    }


 
    /* 
    console.log(this.tituloPartida)
    console.log(this.codigo)
    console.log(this.palabras)
    
 */ 
    this.palabras=[]
  }


  agregarDescripcion(){
    if (this.nivelPartida==="Facil") {
      this.descripcionNivel="Las palabras apareceran de forma horizontal y vertical"
    }else if (this.nivelPartida==="Intermedio") {
      this.descripcionNivel="Las palabras apareceran de forma horizontal, vertical y diagonal"
    }else if (this.nivelPartida==="Avanzado") {
      this.descripcionNivel="Las palabras apareceran de forma horizontal, vertical y diagonal , con la posibilidad de aparecer invetidas"
    }


  }

  ngOnInit(): void {
    
  }


  public popError(msj:string){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: msj,
    })
  }



  public popAfirmation(){
    Swal.fire(
      'Partida Creada',
    )
  }

}
