import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Punteo } from 'src/app/juegos/memorama/models/punteo';
import { Tema } from 'src/app/juegos/memorama/models/tema';
import { MemoramaServiceService } from 'src/app/juegos/memorama/services/memorama-service.service';

@Component({
  selector: 'app-puntaje-memorama',
  templateUrl: './puntaje-memorama.component.html',
  styleUrls: ['./puntaje-memorama.component.css']
})
export class PuntajeMemoramaComponent implements OnInit {

  punteos:Punteo[] = []
  idInstanciaJuego!:number
  tema:Tema= new Tema()

  constructor(private router:ActivatedRoute, private memoramaService:MemoramaServiceService) { }

  async ngOnInit(): Promise<void> {
    this.router.params.subscribe(async ({ id }) => {
      this.idInstanciaJuego = id;
  
      this.tema = await this.memoramaService.getMemoramaIdInstanciaJuego(this.idInstanciaJuego).toPromise();
      this.punteos = await this.memoramaService.getCodigoAulaPuntacionesDePartida(this.idInstanciaJuego).toPromise();
  
      for (let i = 0; i < this.punteos.length; i++) {
        const punteo = this.punteos[i];
        const punteoReport = await this.memoramaService.getListPuntajesAulaInstaicaJuego(this.idInstanciaJuego, punteo.codigo_aula).toPromise();
        punteo.punteosRepor = punteoReport;
        console.log(punteoReport)
      }
    });
  }
  

}
