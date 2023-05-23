import { Component, OnInit } from '@angular/core';
import { InstanciaJuego } from 'src/models/juegos/InstanciaJuego';
import { JuegosService } from '../../../../juegos/services/juegos.service';
import { InstanciasJuegoI } from 'src/models/interfaces/Juego';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creados',
  templateUrl: './creados.component.html',
  styleUrls: ['./creados.component.css']
})
export class CreadosComponent implements OnInit {

  instanciasJuegos: InstanciasJuegoI[] = []

  constructor(
    private juegosService: JuegosService,
    private router: Router,
  ) {
    this.juegosService.getInstanciasJuego().subscribe((resp: InstanciasJuegoI[]) => {
      this.instanciasJuegos = resp;
    })
  }

  ngOnInit(): void {

  }

  dirigirAPuntaje(instancia: InstanciasJuegoI) {
    switch (instancia.id_tipo_juego) {
      case 1:
        this.router.navigate([`profesor/puntaje/comido/${instancia.id_instancia_juego}`])
        break;
      case 2:
        this.router.navigate([`profesor/puntaje/sopa/${instancia.id_instancia_juego}`])
        break;
      case 3:
        this.router.navigate([`profesor/puntaje/memorama/${instancia.id_instancia_juego}`])
        break;
      case 4:
        this.router.navigate([`profesor/puntaje/curioso/${instancia.id_instancia_juego}`])
        break;
      default:
        this.router.navigate([`profesor/creados`])
        break;
    }
  }

}
