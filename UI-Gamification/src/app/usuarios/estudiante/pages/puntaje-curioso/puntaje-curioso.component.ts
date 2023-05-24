import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComidoService } from 'src/app/juegos/comido/services/comido.service';
import { puntuacionCurioso } from 'src/app/juegos/curioso/models/puntuacionCurioso';
import { curiosoCreacionService } from 'src/app/juegos/curioso/services/curioso.service';

@Component({
  selector: 'app-puntaje-curioso',
  templateUrl: './puntaje-curioso.component.html',
  styleUrls: ['./puntaje-curioso.component.css']
})
export class PuntajeCuriosoComponent implements OnInit {


  id_instancia_juego!: number;
  codigoAula: string = "";

  punteos:puntuacionCurioso[]=[];





  constructor(private curiosoService:curiosoCreacionService, private activatedRoute: ActivatedRoute, private comidoService: ComidoService) {

    this.activatedRoute.params.subscribe(({ codigo, id }) => {
      this.id_instancia_juego = Number(id);
      this.codigoAula = codigo;

    })

    this.curiosoService.getHistorialAula(this.codigoAula,this.id_instancia_juego).subscribe((gen:puntuacionCurioso[])=>{
      this.punteos=gen;
    })



   }

  ngOnInit(): void {
  }

}
