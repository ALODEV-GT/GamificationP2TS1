import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-nav-bar-student',
  templateUrl: './nav-bar-student.component.html',
  styleUrls: ['./nav-bar-student.component.css']
})
export class NavBarStudentComponent implements OnInit {
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
