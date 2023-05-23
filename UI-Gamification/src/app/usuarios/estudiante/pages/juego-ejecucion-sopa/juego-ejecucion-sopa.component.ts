import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-juego-ejecucion-sopa',
  templateUrl: './juego-ejecucion-sopa.component.html',
  styleUrls: ['./juego-ejecucion-sopa.component.css']
})
export class JuegoEjecucionSopaComponent implements OnInit {

  id_instancia_juego: string = "";
 

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
