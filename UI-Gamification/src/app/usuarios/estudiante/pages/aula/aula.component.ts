import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-aula',
  templateUrl: './aula.component.html',
  styleUrls: ['./aula.component.css']
})
export class AulaComponent implements OnInit {
  @ViewChild('myModal', { static: true }) myModal!: ElementRef

  publicaciones = [1, 2, 3, 4, 5]
  miembros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  myModalVar: any;

  constructor() { }

  ngOnInit(): void {
    const myModal = this.myModal.nativeElement;
    this.myModalVar = new bootstrap.Modal(myModal);
  }

  openModal() {
    this.myModalVar.show();
  }
}
