import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-juego-ejecucion-comido',
  templateUrl: './juego-ejecucion-comido.component.html',
  styleUrls: ['./juego-ejecucion-comido.component.css']
})
export class JuegoEjecucionComidoComponent implements OnInit {

  id_instancia_juego: string = "";
  esDemo = false;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.id_instancia_juego = id;
      console.log(this.id_instancia_juego);

    })
  }

}
