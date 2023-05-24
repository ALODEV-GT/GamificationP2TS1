import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuarios/services/usuario.service';
import { Usuario } from 'src/models/usuarios/Usuario';
import Swal from 'sweetalert2';
import { creacionCurioso } from '../models/creacionCurioso';
import { preguntaCurioso } from '../models/preguntaCurioso';
import { curiosoCreacionService } from '../services/curioso.service';

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

  constructor(private curiosoService:curiosoCreacionService,private usuarioService:UsuarioService,private router:Router) { }


  ngOnInit(): void {
  }



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

  eliminar(i:number){
    this.preguntas.splice(i,1);
  }

  crearJuego(){


    if (this.preguntas.length<3) {

      this.popError("Minimo debes ingresar 3 preguntas");

    }else{

      let user:Usuario = this.usuarioService.getUsuarioSesion()!;


      this.curiosoService.saveCurioso(new creacionCurioso(this.tituloPartida,user.id_usuario,this.preguntas)).subscribe((gen:creacionCurioso)=>{
        console.log(gen)
        this.popAfirmation();
        this.router.navigate(['/profesor/creados'])
      })
  

    }

   
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
