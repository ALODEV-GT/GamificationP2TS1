import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-juego-ejecucion-comido',
  templateUrl: './juego-ejecucion-comido.component.html',
  styleUrls: ['./juego-ejecucion-comido.component.css']
})
export class JuegoEjecucionComidoComponent implements OnInit {

  esDemo = false;
  id_instancia_juego!: number;
  codigoAula: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe(({ codigo, id }) => {
      this.id_instancia_juego = Number(id);
      this.codigoAula = codigo;
    })
  }

  ngOnInit(): void {

  }

}
