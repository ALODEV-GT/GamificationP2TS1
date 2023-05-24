import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { NotificacionService } from '../../../services/notificacion.service';
import { NotiComentarioI, NotiLikeI, NotiSolicitudAulaI } from 'src/models/notificaciones/interfaces/NotificacionesInterfaces';
import { AsignacionService } from '../../../services/asignacion.service';
import { Asignacion } from 'src/models/aulas/Asignacion';
import { NotiAceptadoAula } from 'src/models/notificaciones/NotiAceptadoAula';
import { NotiRechazadoAula } from 'src/models/notificaciones/NotiRechazadoAula';

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

  notiSolicitudesAula: NotiSolicitudAulaI[] = [];
  notisComentarios: NotiComentarioI[] = [];
  notisLikes: NotiLikeI[] = [];

  myDropVar: any;

  constructor(
    private notificacionService: NotificacionService,
    private asignacionService: AsignacionService
  ) {
    this.listarNotisSolicituAula()
  }

  listarNotisSolicituAula() {
    this.notificacionService.getNotiSolicitudesAula().subscribe((resp: NotiSolicitudAulaI[]) => {
      this.notiSolicitudesAula = resp;
    })
    this.notificacionService.getNotisComentarios().subscribe((resp: NotiComentarioI[]) => {
      this.notisComentarios = resp;
    })
    this.notificacionService.getNotisLikes().subscribe((resp: NotiLikeI[]) => {
      this.notisLikes = resp;
    })
  }

  ngOnInit(): void {
    const myDrop = this.myDrop.nativeElement;
    this.myDropVar = new bootstrap.Dropdown(myDrop);
  }

  aceptarSolicitudAula(aceptar: boolean, noti: NotiSolicitudAulaI) {
    if (aceptar) {
      //Crear asignacion al curso
      const nuevaAsignacion: Asignacion = new Asignacion(0, noti.id_usuario_solicitante, noti.codigo_aula, true);
      this.asignacionService.guardarAsignacion(nuevaAsignacion).subscribe((resp: Asignacion) => {
        //Crear notificacion que lo han aceptado
        const nuevaNoti: NotiAceptadoAula = new NotiAceptadoAula(0, noti.id_usuario_solicitante, resp.id_asignacion, false)
        this.notificacionService.guardarNotiAceptadoAula(nuevaNoti).subscribe((resp: boolean) => {
          //Marcar notificacion de solicitud como visto
          this.notificacionService.setVistoNotificacionSolcitiudAula(noti.id_noti_solicitud_aula).subscribe((resp) => {
            //actualizar notificaciones
            this.listarNotisSolicituAula();
          })
        })
      })
    } else {
      //Crear notificacion que lo han rechazado
      const nuevaNoti: NotiRechazadoAula = new NotiRechazadoAula(0, noti.id_usuario_solicitante, noti.codigo_aula, false)
      this.notificacionService.guardarNotiRechazadoAula(nuevaNoti).subscribe((resp: boolean) => {
        //Marcar notificacion de solicitud como visto
        this.notificacionService.setVistoNotificacionSolcitiudAula(noti.id_noti_solicitud_aula).subscribe((resp) => {
          //actualizar notificaciones
          this.listarNotisSolicituAula();
        })
      });

    }
  }

  recorteTexto(texto: string) {
    let nuevoTexto: string = "";
    if (texto.length < 30) {
      nuevoTexto = texto;
    } else {
      nuevoTexto = texto.slice(0, 29) + "...";
    }
    return nuevoTexto;
  }

  showDropDown() {
    this.myDropVar.toggle()
  }


}
