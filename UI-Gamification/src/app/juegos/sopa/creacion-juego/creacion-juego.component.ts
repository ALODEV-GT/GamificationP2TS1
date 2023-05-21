import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  limite=0;
  constructor(private sopaService:sopaCreacionService) { 

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
    console.log(JSON.stringify(new creacionSopa(this.codigo,this.tituloPartida,1,this.palabras,this.nivelPartida)));

    this.sopaService.saveUsurioSesion(new creacionSopa(this.codigo,this.tituloPartida,1,this.palabras,this.nivelPartida)).subscribe((gen:creacionSopa)=>{
      console.log(gen)
      this.popAfirmation();
    })
    /* 
    console.log(this.tituloPartida)
    console.log(this.codigo)
    console.log(this.palabras)
    
 */ 
    this.palabras=[]
  }

  ngOnInit(): void {
    
  }


  public popAfirmation(){
    Swal.fire(
      'Partida Creada',
    )
  }

}
