import { Tema } from './../models/tema';
import { MemoramaServiceService } from './../services/memorama-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-area-juegos-creados',
  templateUrl: './area-juegos-creados.component.html',
  styleUrls: ['./area-juegos-creados.component.css']
})
export class AreaJuegosCreadosComponent implements OnInit {

  temas:Tema[]=[]

  constructor(private router:Router, private memoramaService:MemoramaServiceService) { }

  ngOnInit(): void {
    this.memoramaService.getTemaJuegosCreados(1).subscribe(
      (value:Tema[]) => {
        this.temas=value
      }
    )
  }

  clickGoDemo(){
    this.router.navigate(['profesor/demo-juego'])
  }

}
