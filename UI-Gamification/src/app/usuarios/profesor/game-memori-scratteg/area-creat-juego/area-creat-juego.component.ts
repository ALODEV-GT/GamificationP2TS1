import { Tema } from './../models/tema';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-area-creat-juego',
  templateUrl: './area-creat-juego.component.html',
  styleUrls: ['./area-creat-juego.component.css']
})
export class AreaCreatJuegoComponent implements OnInit {

  tema:Tema=new Tema()

  constructor() { }

  ngOnInit(): void {
  }



  

}
