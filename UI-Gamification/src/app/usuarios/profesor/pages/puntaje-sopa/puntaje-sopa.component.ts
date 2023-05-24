import { Component, OnInit } from '@angular/core';
import { puntuacionSopa } from 'src/app/juegos/sopa/juego-sopa-letras/models/puntuacionSopa';
import { sopaJuegoService } from 'src/app/juegos/sopa/juego-sopa-letras/service/sopaService';

@Component({
  selector: 'app-puntaje-sopa',
  templateUrl: './puntaje-sopa.component.html',
  styleUrls: ['./puntaje-sopa.component.css']
})
export class PuntajeSopaComponent implements OnInit {

  punteos:puntuacionSopa[]=[];


  constructor(private sopaService:sopaJuegoService) {

    this.sopaService.getHistorial().subscribe((gen:puntuacionSopa[])=>{
      this.punteos=gen;
    })



   }

  ngOnInit(): void {
  }

}
