import { MemoramaServiceService } from 'src/app/juegos/memorama/services/memorama-service.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Punteo } from 'src/app/juegos/memorama/models/punteo';
import { Tema } from 'src/app/juegos/memorama/models/tema';

@Component({
  selector: 'app-puntaje-memorama',
  templateUrl: './puntaje-memorama.component.html',
  styleUrls: ['./puntaje-memorama.component.css']
})
export class PuntajeMemoramaComponent implements OnInit {

  punteo:Punteo = new Punteo()
  idInstanciaJuego!:number
  tema:Tema= new Tema()
  codigo!:string
  constructor(private router:ActivatedRoute, private memoramaService:MemoramaServiceService) { }

  async ngOnInit(): Promise<void> {
    this.router.params.subscribe(async ({ codigo, id }) => {
      this.idInstanciaJuego = id;
      this.codigo = codigo
      this.tema = await this.memoramaService.getMemoramaIdInstanciaJuego(this.idInstanciaJuego).toPromise();
      const punteoReport = await this.memoramaService.getListPuntajesAulaInstaicaJuego(this.idInstanciaJuego, this.codigo).toPromise();
      this.punteo.punteosRepor = punteoReport
    });
  }

}
