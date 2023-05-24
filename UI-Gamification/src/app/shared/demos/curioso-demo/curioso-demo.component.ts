import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { curiosoPregunta } from 'src/app/juegos/curioso/models/curiosoPregunta';
import { historialCurioso } from 'src/app/juegos/curioso/models/historialCurioso';
import { opcionCurioso } from 'src/app/juegos/curioso/models/opcionCurioso';
import { preguntaCurioso } from 'src/app/juegos/curioso/models/preguntaCurioso';
import { tituloCurioso } from 'src/app/juegos/curioso/models/tituloCurioso';
import { curiosoCreacionService } from 'src/app/juegos/curioso/services/curioso.service';
import { UsuarioService } from 'src/app/usuarios/services/usuario.service';
import { Usuario } from 'src/models/usuarios/Usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-curioso-demo',
  templateUrl: './curioso-demo.component.html',
  styleUrls: ['./curioso-demo.component.css']
})
export class CuriosoDemoComponent implements OnInit {


  id_instancia_juego: string = "";
  codigo_aula:string="";





  pregunta:string=""
  ayuda:string=""
  respuesta:string=""
  distractores:string[]=[]

  opciones:string[]=[]

  preguntas:preguntaCurioso[]=[];

  indice:number=0;

  totalPreguntas:number=0;

  puntuacion:number=0;

  preguntasAcertadas:number=0;

  constructor(private activatedRoute: ActivatedRoute,private renderer: Renderer2,private curiosoService:curiosoCreacionService,private router:Router,private usuarioService:UsuarioService) { 

     this.preguntas.push(new preguntaCurioso("¿Nombre de la pagina ?","Game-Learn",["Gamificacion","JuegosJuegos","Jugando"]))
    this.preguntas.push(new preguntaCurioso("¿Cuanto es 2+2?","4",["8","4","2"]))
    this.preguntas.push(new preguntaCurioso("¿El sol es?","estrella",["planeta","constelacion","universo"]))


    this.totalPreguntas=this.preguntas.length;
    this.cambiarPregunta();


  }

  async ngOnInit(): Promise<void> {

  

  }



  cambiarPregunta(){
   // let indice=0;

    this.pregunta=this.preguntas[this.indice].pregunta;
   // this.ayuda=this.preguntas[this.indice].ayuda;
    this.distractores=this.preguntas[this.indice].opciones;
    this.opciones=this.distractores;
    this.opciones.push(this.preguntas[this.indice].respuesta);

    this.respuesta=this.preguntas[this.indice].respuesta;


    this.opciones=this.desordenarArreglo(this.opciones);

 
  }


  seleccionarOpcion(index:number){
    if (this.respuesta===this.opciones[index]) {
      this.popPalabraAcertada();
      this.puntuacion=this.puntuacion+100;
      this.preguntasAcertadas=this.preguntasAcertadas+1;
    }else{
      this.popPalabraErronea();
    }

    this.indice=this.indice+1;
    this.totalPreguntas--;
    
    if(this.totalPreguntas==0){
      this.juegoTerminado();
      
    }else{

      this.cambiarPregunta();
    }

    

  }



  juegoTerminado(){
    this.popJuegoTerminado();
   // this.guardarHistorial();
    this.router.navigate(['/inicio/principal']);

  }


  guardarHistorial(){
    let user:Usuario = this.usuarioService.getUsuarioSesion()!;
    
    this.curiosoService.saveHistorial(new historialCurioso(parseInt(this.id_instancia_juego),this.codigo_aula,user.id_usuario,this.puntuacion,this.preguntasAcertadas)).subscribe((gen:historialCurioso)=>{
      console.log(gen)
    })




  }


   desordenarArreglo(array: string[]): string[] {
    const shuffledArray = array.slice(); // Crear una copia del arreglo original
  
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Generar un índice aleatorio
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Intercambiar elementos
    }
  
    return shuffledArray;
  }
  
  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  getRandomColor2(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getRandomColor3(): string {
    const colors = ["#FF595E", "#FFCA3A", "#8AC926", "#1982C4", "#6A4C93"]; // Colores disponibles
  
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  public popPalabraAcertada(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Respuesta Correcta',
      showConfirmButton: false,
      timer: 1000,

      
    })
  }

  public popPalabraErronea(){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Respuesta Incorrecta',
      showConfirmButton: false,
      timer: 1000,

      
    })
  }


  public popJuegoTerminado() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Juego terminado',
      text: 'Puntuacion obtenida '+this.puntuacion +" Aciertos : "+this.preguntasAcertadas,
      
      showConfirmButton: false,
      timer: 4000,


    })
  }

}
