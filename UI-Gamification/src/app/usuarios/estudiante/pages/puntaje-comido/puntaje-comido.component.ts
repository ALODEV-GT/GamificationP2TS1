import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComidoService } from 'src/app/juegos/comido/services/comido.service';
import { Registro } from 'src/models/juegos/InterfacesJuego';

@Component({
  selector: 'app-puntaje-comido',
  templateUrl: './puntaje-comido.component.html',
  styleUrls: ['./puntaje-comido.component.css']
})
export class PuntajeComidoComponent implements OnInit {

  id_instancia_juego!: number;
  codigoAula: string = "";
  registros: Registro[] = []
  nombrePartida: string = "Nadie ha jugado";

  constructor(
    private activatedRoute: ActivatedRoute,
    private comidoService: ComidoService
  ) {
    this.activatedRoute.params.subscribe(({ codigo, id }) => {
      this.id_instancia_juego = Number(id);
      this.codigoAula = codigo;
      this.comidoService.getPunteoAula(this.id_instancia_juego, this.codigoAula).subscribe((resp: Registro[]) => {
        this.registros = resp;
        if (resp) {
          if (resp.length > 0) {
            this.nombrePartida = resp[0].nombre_partida;
          }
        }
      })
    })
  }

  ngOnInit(): void {
  }

}
