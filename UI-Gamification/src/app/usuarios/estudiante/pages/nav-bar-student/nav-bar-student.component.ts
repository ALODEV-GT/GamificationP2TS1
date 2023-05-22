import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { NotificacionService } from '../../../services/notificacion.service';
import { NotiAceptadoAulaI, NotiRechazadoAulaI } from 'src/models/notificaciones/interfaces/NotificacionesInterfaces';

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

  notisAceptadoAula: NotiAceptadoAulaI[] = []
  notisRechazadoAula: NotiRechazadoAulaI[] = []

  myDropVar: any;

  constructor(
    private notificacionService: NotificacionService
  ) {
    this.notificacionService.getNotisAceptadoAula().subscribe((resp: NotiAceptadoAulaI[]) => {
      this.notisAceptadoAula = resp;
    })
    this.notificacionService.getNotisRechazadoAula().subscribe((resp: NotiRechazadoAulaI[]) => {
      this.notisRechazadoAula = resp;
    })
  }

  ngOnInit(): void {
    const myDrop = this.myDrop.nativeElement;
    this.myDropVar = new bootstrap.Dropdown(myDrop);
  }

  showDropDown() {
    this.myDropVar.toggle()
  }

}
