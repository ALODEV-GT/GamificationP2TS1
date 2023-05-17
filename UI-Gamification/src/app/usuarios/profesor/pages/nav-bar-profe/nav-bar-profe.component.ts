import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-nav-bar-profe',
  templateUrl: './nav-bar-profe.component.html',
  styleUrls: ['./nav-bar-profe.component.css']
})
export class NavBarProfeComponent implements OnInit {
  @ViewChild('myDrop', { static: true }) myDrop!: ElementRef

  notificaciones = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ]

  myDropVar: any;

  constructor() {
  }

  ngOnInit(): void {
    const myDrop = this.myDrop.nativeElement;
    this.myDropVar = new bootstrap.Dropdown(myDrop);
  }

  showDropDown() {
    this.myDropVar.toggle()
  }

}
