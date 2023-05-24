import { Component, OnInit } from '@angular/core';

import { casillaLetra } from './models/casilla';
import { palabraPosicion } from './models/palabraPos';
import Swal from 'sweetalert2'
import { sopaJuegoService } from './service/sopaService';
import { palabraBD } from './models/palabraBD';
import { titulo } from './models/titulo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juego-sopa-letras',
  templateUrl: './juego-sopa-letras.component.html',
  styleUrls: ['./juego-sopa-letras.component.css']
})
export class JuegoSopaLetrasComponent implements OnInit {


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

  dificultad: string = "Intermedio";

  seleccion: string = "";



  //arreglo de palabras , se debe traer de la bd
  arrayPalabras: string[] = [];

  //areglo de las mismas palabras , algunas con modificaciones
  arrayPalabrasUsadas: string[] = [];
  totalPalabras: number=0;



  cadena: string = ""
  titulo: string = "";


  constructor(private sopaService: sopaJuegoService,private router:Router) {




  }

 async ngOnInit(): Promise<void> {


  this.arrayPalabras.push("GAME")
  this.arrayPalabras.push("LEARN")
  this.arrayPalabras.push("JUEGA")
  this.arrayPalabras.push("APRENDE")
  this.arrayPalabras.push("DIVIERTETE")

  this.totalPalabras=this.arrayPalabras.length;


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
 
      this.agregarPalabra(this.arrayPalabrasUsadas[index])

    }

    this.llenarVacios();

 
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

            
         }else{
     
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

      this.matriz[element[0]][element[1]].encontrado = true;
    }

    this.popPalabraAcertada();

    this.posicionesSeleccionadas = [];
    this.puntuacion = this.puntuacion + 100;


    this.totalPalabras--;
    if (this.totalPalabras === 0) {
      this.popJuegoTerminado();

      this.router.navigate(['/inicio/principal'])
    }


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
      title: 'Demo terminado',
      text: 'Puntuacion obtenida '+this.puntuacion,
      showConfirmButton: false,
      timer: 4000,


    })
  }



}
