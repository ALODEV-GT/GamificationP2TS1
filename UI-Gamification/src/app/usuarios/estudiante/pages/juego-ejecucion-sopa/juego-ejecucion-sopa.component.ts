import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { casillaLetra } from 'src/app/juegos/sopa/juego-sopa-letras/models/casilla';
import { historialSopa } from 'src/app/juegos/sopa/juego-sopa-letras/models/historialSopa';
import { palabraBD } from 'src/app/juegos/sopa/juego-sopa-letras/models/palabraBD';
import { palabraPosicion } from 'src/app/juegos/sopa/juego-sopa-letras/models/palabraPos';
import { titulo } from 'src/app/juegos/sopa/juego-sopa-letras/models/titulo';
import { sopaJuegoService } from 'src/app/juegos/sopa/juego-sopa-letras/service/sopaService';
import { UsuarioService } from 'src/app/usuarios/services/usuario.service';
import { Usuario } from 'src/models/usuarios/Usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-juego-ejecucion-sopa',
  templateUrl: './juego-ejecucion-sopa.component.html',
  styleUrls: ['./juego-ejecucion-sopa.component.css']
})
export class JuegoEjecucionSopaComponent implements OnInit {

  id_instancia_juego: string = "";
  codigo_aula:string="";




  //para jugar
  palabrasArmadas: palabraPosicion[] = [];
  letrasEncontradas: casillaLetra[][] = [];
  posicionesEncontradas: [number, number][] = []


  //puntuacion
  puntuacion: number = 0;




  //para el tablero
  matriz: casillaLetra[][] = [];
  palabrasPosicion: palabraPosicion[] = [];
  posicionesSeleccionadas: [number, number][] = [];


  //dificultad se debe traer del la info de la partida
  facil: boolean = true;
  intermedio: boolean = false;
  dificil: boolean = false;

  nombres: string[] = [];

  dificultad: string = "";

  seleccion: string = "";



  //arreglo de palabras , se debe traer de la bd
  arrayPalabras: string[] = [];

  //areglo de las mismas palabras , algunas con modificaciones
  arrayPalabrasUsadas: string[] = [];
  totalPalabras: number=0;



  cadena: string = ""
  titulo: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,private sopaService:sopaJuegoService,private router:Router,private usuarioService:UsuarioService
  ) { }

 

 async ngOnInit(): Promise<void> {
  
  this.activatedRoute.params.subscribe(({ codigo, id }) => {
    this.id_instancia_juego = id;
    this.codigo_aula=codigo;

  })



  let titulo:titulo = await this.sopaService.getTituloInstancia(parseInt(this.id_instancia_juego)).toPromise();

  this.titulo=titulo.titulo;
  
  let palabras:palabraBD[] = await this.sopaService.getPreguntasJuego(titulo.id).toPromise();

  for (let index = 0; index < palabras.length; index++) {
    this.arrayPalabras.push((palabras[index].palabra).toUpperCase());
    
  }


  this.dificultad=titulo.nivel;


  this.totalPalabras=palabras.length;


  if (this.dificultad == "Facil") {
    this.nombres.push("horizontal")
    this.nombres.push("vertical")
  } else if (this.dificultad == "Intermedio") {
    this.nombres.push("horizontal")
    this.nombres.push("vertical")
    this.nombres.push("diagonal")
  } else if (this.dificultad == "Avanzado") {
    this.nombres.push("horizontal")
    this.nombres.push("vertical")
    this.nombres.push("diagonal")
  }



  this.generarJuego();


  }


  inicializarMatriz() {
    let tamanio = this.palabraGrande();
    this.matriz = [];
    for (let i = 0; i < tamanio; i++) {
      this.matriz.push([]);
      for (let j = 0; j < tamanio; j++) {
        this.matriz[i].push(new casillaLetra(' ', false));

      }
    }
  }

  private posicionValida(palabra: string, fila: number, columna: number, direccion: string): boolean {
    if (fila < 0 || columna < 0) {
      return false;
    }



    let tamanio = this.palabraGrande();
    let filaFinal = fila;
    let columnaFinal = columna;

    if (direccion === 'horizontal') {
      columnaFinal += palabra.length - 1;
    } else if (direccion === 'vertical') {
      filaFinal += palabra.length - 1;
    } else if (direccion === 'diagonal') {
      filaFinal += palabra.length - 1;
      columnaFinal += palabra.length - 1;
    }

    if (filaFinal >= tamanio || columnaFinal >= tamanio) {
      return false;
    }

    for (let i = fila - 1; i <= filaFinal + 1; i++) {
      for (let j = columna - 1; j <= columnaFinal + 1; j++) {
        if (i >= 0 && i < tamanio && j >= 0 && j < tamanio && this.matriz[i][j].letra !== ' ') {
          return false;
        }
      }
    }

    return true;
  }

  agregarReversibles() {
    const nombres = ["si", "no",];
    for (let index = 0; index < this.arrayPalabras.length; index++) {


      let aleatorio = nombres[Math.floor(Math.random() * nombres.length)];

      if (aleatorio === "si") {

        this.arrayPalabrasUsadas.push(this.arrayPalabras[index].split("").reverse().join(""));

      } else if (aleatorio === "no") {
        this.arrayPalabrasUsadas.push(this.arrayPalabras[index]);
      }

    }
  }

  public agregarPalabra(palabra: string) {



    let tamanio = this.palabraGrande();



    let fila = Math.floor(Math.random() * tamanio);
    let columna = Math.floor(Math.random() * tamanio);


    let aleatorio = this.nombres[Math.floor(Math.random() * this.nombres.length)];

    let posicion: [number, number][] = [];

    let palabraValida = false;

    while (!palabraValida) {
      if (this.posicionValida(palabra, fila, columna, aleatorio)) {
        palabraValida = true;


        for (let i = 0; i < palabra.length; i++) {
          if (aleatorio === 'horizontal') {
            this.matriz[fila][columna + i].letra = palabra[i];
    
            posicion.push([fila, (columna + i)]);

          } else if (aleatorio === 'vertical') {
            this.matriz[fila + i][columna].letra = palabra[i];
     
            posicion.push([(fila + i), columna]);

          } else if (aleatorio === 'diagonal') {
            this.matriz[fila + i][columna + i].letra = palabra[i];
           
            posicion.push([(fila + i), (columna + i)]);
          }

        }

        this.palabrasPosicion.push(new palabraPosicion(palabra, posicion))
      } else {
        fila = Math.floor(Math.random() * tamanio);
        columna = Math.floor(Math.random() * tamanio);
        aleatorio = this.nombres[Math.floor(Math.random() * this.nombres.length)];
      }
      posicion = [];
    }
  }




  llenarVacios() {
    let tamanio = this.palabraGrande();

    for (let index = 0; index < tamanio; index++) {
      for (let jindex = 0; jindex < tamanio; jindex++) {
        if (this.matriz[index][jindex].letra == ' ') {
          const randomLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
          this.matriz[index][jindex].letra = randomLetter;
        }

      }

    }
  }


  generarJuego() {
 


    this.inicializarMatriz();
    //comprobacion de dificultad
    if (this.dificultad === "Avanzado") {
      this.agregarReversibles();
    } else {
 
      this.arrayPalabrasUsadas = this.arrayPalabras;
    }



    for (let index = 0; index < this.arrayPalabrasUsadas.length; index++) {
      console.log(this.arrayPalabrasUsadas[index])
      this.agregarPalabra(this.arrayPalabrasUsadas[index])

    }

    this.llenarVacios();


    for (let index = 0; index < this.palabrasPosicion.length; index++) {
      const element = this.palabrasPosicion[index];

    }
  }


  palabraGrande() {

    let palabraMasLarga = '';

    for (let palabra of this.arrayPalabras) {
      if (palabra.length > palabraMasLarga.length) {
        palabraMasLarga = palabra;
      }
    }

    return palabraMasLarga.length + 3;


  }


  clickCasilla(index: number, jindex: number) {

    if (this.matriz[index][jindex].select == true) {
      this.matriz[index][jindex].select = false;
      this.puntuacion = this.puntuacion - 10;
      this.posicionesSeleccionadas = this.posicionesSeleccionadas.filter(coord => !(coord[0] === index && coord[1] == jindex));

    } else if (this.matriz[index][jindex].select == false) {
      this.matriz[index][jindex].select = true;
      this.posicionesSeleccionadas.push([index, jindex]);
    }
  





    this.comprobar2();


  }



  comprobar2(){
   
    
    let igualdad=true;

    this.posicionesSeleccionadas.sort();

    for (let index = 0; index < this.palabrasPosicion.length; index++) {
      igualdad=true;
      const palabra = this.palabrasPosicion[index];
      palabra.posiciones.sort();
      if (palabra.posiciones.length===this.posicionesSeleccionadas.length) {
        
        for (let jindex = 0; jindex < palabra.posiciones.length; jindex++) {
         
         if (palabra.posiciones[jindex][0]===this.posicionesSeleccionadas[jindex][0] && palabra.posiciones[jindex][1]===this.posicionesSeleccionadas[jindex][1] ) {
          //  console.log("igualdad")
            
         }else{
         // console.log("no igualdad")
         igualdad=false;
         }
          
        }

        if (igualdad) {
     
          this.funcionPalabra();
          break;
        }else{
      
          
        }




      }

      
    }


  }



  funcionPalabra() {

  

    for (let index = 0; index < this.posicionesSeleccionadas.length; index++) {
      const element = this.posicionesSeleccionadas[index];
/*       console.log(element)
      console.log(this.matriz[element[0]][element[1]]) */
      this.matriz[element[0]][element[1]].encontrado = true;
    }

    this.popPalabraAcertada();

    this.posicionesSeleccionadas = [];
    this.puntuacion = this.puntuacion + 100;


    this.totalPalabras--;
    if (this.totalPalabras === 0) {
      this.popJuegoTerminado();
    
      this.guardarHistorial();
      this.router.navigate(['/estudiante/mis-aulas']);


    }


  }


  guardarHistorial(){
    let user:Usuario = this.usuarioService.getUsuarioSesion()!;
    
    this.sopaService.saveHistorial(new historialSopa(parseInt(this.id_instancia_juego),this.codigo_aula,user.id_usuario,this.puntuacion,this.dificultad)).subscribe((gen:historialSopa)=>{
      console.log(gen);
      
    })




  }




  public popPalabraAcertada() {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'Palabra Encontada',
      showConfirmButton: false,
      timer: 1000,


    })
  }


  public popJuegoTerminado() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Juego terminado',
      text: 'Puntuacion obtenida '+this.puntuacion,
      showConfirmButton: false,
      timer: 4000,


    })
  }







}
