import { Component, OnInit } from '@angular/core';
import { puntuacionCurioso } from 'src/app/juegos/curioso/models/puntuacionCurioso';
import { curiosoCreacionService } from 'src/app/juegos/curioso/services/curioso.service';

@Component({
  selector: 'app-puntaje-curioso',
  templateUrl: './puntaje-curioso.component.html',
  styleUrls: ['./puntaje-curioso.component.css']
})
export class PuntajeCuriosoComponent implements OnInit {

  punteos:puntuacionCurioso[]=[];


  constructor(private curiosoService:curiosoCreacionService) {

    this.curiosoService.getHistorial().subscribe((gen:puntuacionCurioso[])=>{
      this.punteos=gen;
    })



   }

  ngOnInit(): void {
  }

}
