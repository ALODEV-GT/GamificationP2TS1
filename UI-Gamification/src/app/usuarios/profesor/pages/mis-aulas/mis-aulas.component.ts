import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-mis-aulas',
  templateUrl: './mis-aulas.component.html',
  styleUrls: ['./mis-aulas.component.css']
})
export class MisAulasComponent implements OnInit {
  @ViewChild('myModal', { static: true }) myModal!: ElementRef

  aulas = [1, 2, 3, 4, 5]

  myModalVar: any;

  constructor() { }

  ngOnInit(): void {
    const myModal = this.myModal.nativeElement;
    this.myModalVar = new bootstrap.Modal(myModal);
  }

  openModal() {
    this.myModalVar.show();
  }

  unirseAula() {
    this.myModalVar.hide();
  }

}
