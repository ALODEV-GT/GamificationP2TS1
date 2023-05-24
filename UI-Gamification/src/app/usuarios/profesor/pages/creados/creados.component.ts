import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { JuegosService } from '../../../../juegos/services/juegos.service';
import { InstanciasJuegoI } from 'src/models/interfaces/Juego';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { AulaService } from 'src/app/usuarios/services/aula.service';
import { Aula } from 'src/models/aulas/Aula';
import { CompartirAula } from 'src/models/juegos/CompartirAula';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-creados',
  templateUrl: './creados.component.html',
  styleUrls: ['./creados.component.css']
})
export class CreadosComponent implements OnInit {
  @ViewChild('myModal', { static: true }) myModal!: ElementRef
  myModalVar: any;

  instanciasJuegos: InstanciasJuegoI[] = []

  misAulas: Aula[] = []

  idInstanciaJuegoActual = 0;

  constructor(
    private aulaService: AulaService,
    private juegosService: JuegosService,
    private router: Router,
  ) {
    this.juegosService.getInstanciasJuego().subscribe((resp: InstanciasJuegoI[]) => {
      this.instanciasJuegos = resp;
    })
    this.listarAulas()
  }

  ngOnInit(): void {
    const myModal = this.myModal.nativeElement;
    this.myModalVar = new bootstrap.Modal(myModal);
  }

  listarAulas() {
    this.aulaService.getMisAulasProfesor().subscribe((resp: Aula[]) => {
      this.misAulas = resp;
    })
  }

  openModal(idInstanciaJuego: number) {
    this.idInstanciaJuegoActual = idInstanciaJuego;
    this.myModalVar.show();
  }

  compartir(aula: Aula) {
    const nuevoCompartirAula: CompartirAula = new CompartirAula(0, this.idInstanciaJuegoActual, aula.codigo_aula);
    this.juegosService.existeCompartirAula(this.idInstanciaJuegoActual, aula.codigo_aula).subscribe((resp: boolean) => {
      if (resp) {
        Swal.fire({
          icon: "info",
          title: "Compartido",
          text: "Ya esta compartido"
        })
      } else {
        this.juegosService.guardarCompartirAula(nuevoCompartirAula).subscribe((resp: boolean) => {
          if (resp) {
            Swal.fire({
              icon: "success",
              title: "Compartido",
              text: "Se ha compartido el juego."
            })
          } else {
            Swal.fire({
              icon: "error",
              title: "No compartido",
              text: "No se pudo compartir"
            })
          }
        })
      }
    })
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
