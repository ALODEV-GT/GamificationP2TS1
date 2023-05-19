import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {

  comentarios = [1, 2, 3, 4, 5]

  comentariosMostrados: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  mostrarComentarios() {
    this.comentariosMostrados = !this.comentariosMostrados;
  }

}
