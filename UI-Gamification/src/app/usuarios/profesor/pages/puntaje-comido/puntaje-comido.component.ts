import { Component, OnInit } from '@angular/core';
import { ComidoService } from '../../../../juegos/comido/services/comido.service';
import { ActivatedRoute } from '@angular/router';
import { Rep1 } from 'src/models/juegos/InterfacesJuego';

@Component({
  selector: 'app-puntaje-comido',
  templateUrl: './puntaje-comido.component.html',
  styleUrls: ['./puntaje-comido.component.css']
})
export class PuntajeComidoComponent implements OnInit {

  tablas: Rep1[] = []
  nombrePartida: string = "Nadie ha jugado";
  idPartida: number = 0;
  constructor(
    private activatedRoute: ActivatedRoute,
    private comidoService: ComidoService
  ) {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.comidoService.getPunteos(Number(id)).subscribe((resp: Rep1[]) => {
        this.tablas = resp;
        if (resp) {
          if (resp.length > 0) {
            if (resp[0].registros) {
              if (resp[0].registros.length > 0) {
                this.nombrePartida = resp[0].registros[0].nombre_partida;
                this.idPartida = id;
              }
            }
          }
        }
      })
    })
  }

  ngOnInit(): void {
  }

}
