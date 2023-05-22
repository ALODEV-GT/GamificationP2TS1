import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';
import Swal from 'sweetalert2';
import { AulaService } from '../../../services/aula.service';
import { NotificacionService } from '../../../services/notificacion.service';
import { NotiSolicitudAula } from 'src/models/notificaciones/NotiSolicitudAula';
import { Aula } from 'src/models/aulas/Aula';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from 'src/models/usuarios/Usuario';

@Component({
  selector: 'app-mis-aulas',
  templateUrl: './mis-aulas.component.html',
  styleUrls: ['./mis-aulas.component.css']
})
export class MisAulasComponent implements OnInit {
  @ViewChild('myModal', { static: true }) myModal!: ElementRef

  aulas = [1, 2, 3, 4, 5]
  misAulas: Aula[] = []

  codigoAula: string = "";

  myModalVar: any;

  constructor(
    private aulaService: AulaService,
    private notificacionService: NotificacionService,
    private usuarioService: UsuarioService
  ) {
    this.listarAulas()
  }

  listarAulas() {
    this.aulaService.getMisAulasEstudiante().subscribe((resp: Aula[]) => {
      this.misAulas = resp;
    })
  }

  ngOnInit(): void {
  }

  openModal() {
    const myModal = this.myModal.nativeElement;
    this.myModalVar = new bootstrap.Modal(myModal);
    this.myModalVar.show();
  }

  unirseAula() {
    if (this.codigoAula.trim().length < 4) {
      Swal.fire({
        icon: "error",
        title: "invalido",
        text: "Ingrese un codigo valido"
      })
      return
    }

    //Verificar si el aula existe
    this.aulaService.existeAula(this.codigoAula).subscribe((resp: boolean) => {
      if (resp) {

        //Verificar si ya hay una solicitud
        this.notificacionService.existeNotificacionSolcitiudAula(this.codigoAula).subscribe((resp: boolean) => {
          if (resp) {
            Swal.fire({
              icon: "info",
              title: "Pendiente",
              text: "Ya has enviado una solicitud a este aula"
            })
          } else {
            const usuario: Usuario = this.usuarioService.getUsuarioSesion()!;
            this.aulaService.getAulaByCodigo(this.codigoAula).subscribe((resp: Aula) => {
              const nuevaNoti = new NotiSolicitudAula(0, resp.id_usuario_creador, usuario.id_usuario, resp.codigo_aula, false);
              this.notificacionService.guardarNotiSolicitudAula(nuevaNoti).subscribe((resp: boolean) => {
                Swal.fire({
                  icon: "success",
                  title: "Enviado",
                  text: "Se ha enviado la solicitud al profesor"
                })
                this.codigoAula = "";
                this.myModalVar.hide();
              })
            })
          }
        })
      } else {
        Swal.fire({
          icon: "info",
          title: "No existe",
          text: "Este aula no existe"
        })
      }
    })





  }

}
