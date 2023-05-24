import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { puntuacionSopa } from 'src/app/juegos/sopa/juego-sopa-letras/models/puntuacionSopa';
import { sopaJuegoService } from 'src/app/juegos/sopa/juego-sopa-letras/service/sopaService';

@Component({
  selector: 'app-puntaje-sopa',
  templateUrl: './puntaje-sopa.component.html',
  styleUrls: ['./puntaje-sopa.component.css']
})
export class PuntajeSopaComponent implements OnInit {

  id_instancia_juego!: number;
  codigoAula: string = "";
  punteos:puntuacionSopa[]=[];


  constructor(private activatedRoute: ActivatedRoute,private sopaService:sopaJuegoService) {


    this.activatedRoute.params.subscribe(({ codigo, id }) => {
      this.id_instancia_juego = Number(id);
      this.codigoAula = codigo;

    })


    this.sopaService.getHistorialAula(this.codigoAula,this.id_instancia_juego).subscribe((gen:puntuacionSopa[])=>{
      this.punteos=gen;
    })



   }

  ngOnInit(): void {
  }
}
