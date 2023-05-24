import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { AulaService } from 'src/app/usuarios/services/aula.service';
import { PublicacionService } from 'src/app/usuarios/services/publicacion.service';
import { UsuarioService } from 'src/app/usuarios/services/usuario.service';
import { Miembro } from 'src/models/interfaces/Miembro';
import { Publicacion } from 'src/models/publicaciones/Publicacion';
import { Usuario } from 'src/models/usuarios/Usuario';
import Swal from 'sweetalert2';
import { JuegosService } from '../../../../juegos/services/juegos.service';
import { JuegoCompartidoI } from 'src/models/juegos/InterfacesJuego';

@Component({
  selector: 'app-aula',
  templateUrl: './aula.component.html',
  styleUrls: ['./aula.component.css']
})
export class AulaComponent implements OnInit {
  @ViewChild('myModal', { static: true }) myModal!: ElementRef

  miembros: Miembro[] = []

  myModalVar: any;
  contenido: string = "";
  codigoAula: string = "";
  usuario!: Usuario;
  publicaciones: Publicacion[] = []
  juegosCompartidos: JuegoCompartidoI[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private publicacionService: PublicacionService,
    private usuarioService: UsuarioService,
    private aulaService: AulaService,
    private juegosService: JuegosService,
    private router: Router
  ) {
    this.usuario = this.usuarioService.getUsuarioSesion()!;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ codigo }) => {
      this.codigoAula = codigo;
      this.listarPublicaciones();
      this.listarMiembros();
      this.listarJuegosCompartidos();
    })

    const myModal = this.myModal.nativeElement;
    this.myModalVar = new bootstrap.Modal(myModal);
  }

  listarJuegosCompartidos() {
    this.juegosService.getAllCompartirAula(this.codigoAula).subscribe((resp: JuegoCompartidoI[]) => {
      this.juegosCompartidos = resp;
    })
  }

  listarPublicaciones() {
    this.publicacionService.getPublicaciones(this.codigoAula).subscribe((resp: Publicacion[]) => {
      this.publicaciones = resp;
    })
  }

  listarMiembros() {
    this.aulaService.getMiembrosAula(this.codigoAula).subscribe((resp: Miembro[]) => {
      this.miembros = resp;
    })
  }

  colorBoton(juego: JuegoCompartidoI): string {
    switch (juego.id_tipo_juego) {
      case 1:
        return "btn btn-dark btn-juego"
      case 2:
        return "btn btn-danger btn-juego"
      case 3:
        return "btn btn-warning btn-juego"
      case 4:
        return "btn btn-success btn-juego"
      default:
        return "btn btn-secondary btn-juego"
    }

  }

  colorBotonPuntaje(juego: JuegoCompartidoI): string {
    switch (juego.id_tipo_juego) {
      case 1:
        return "btn btn-dark"
      case 2:
        return "btn btn-danger"
      case 3:
        return "btn btn-warning"
      case 4:
        return "btn btn-success"
      default:
        return "btn btn-secondary"
    }

  }

  redireccionar(juego: JuegoCompartidoI) {
    switch (juego.id_tipo_juego) {
      case 1:
        this.router.navigate([`estudiante/aula/${this.codigoAula}/juego/comido/${juego.id_instancia_juego}`])
        break;
      case 2:
        this.router.navigate([`estudiante/aula/${this.codigoAula}/juego/sopa/${juego.id_instancia_juego}`])
        break;
      case 3:
        this.router.navigate([`estudiante/aula/${this.codigoAula}/juego/memorama/${juego.id_instancia_juego}`])
        break;
      case 4:
        this.router.navigate([`estudiante/aula/${this.codigoAula}/juego/curioso/${juego.id_instancia_juego}`])
        break;
      default:
        this.router.navigate([`estudiante/aula/${this.codigoAula}`])
        break;
    }
  }

  publicar() {

    if (this.contenido.trim().length == 0) {
      Swal.fire({
        icon: "error",
        title: "Vacio",
        text: "Escribe algo"
      })
      return
    }

    const usuario: Usuario = this.usuarioService.getUsuarioSesion()!;

    const nuevaPublicacion: Publicacion = new Publicacion(0, usuario.id_usuario, this.codigoAula, this.contenido);
    this.publicacionService.guardarPublicacion(nuevaPublicacion).subscribe((resp: boolean) => {
      if (resp) {
        this.listarPublicaciones()
        this.contenido = "";
      } else {
        Swal.fire({
          icon: "error",
          title: ":C",
          text: "No se pudo publicar"
        })
      }
    })
  }

  dirigirAPuntaje(juego: JuegoCompartidoI) {
    switch (juego.id_tipo_juego) {
      case 1:
        this.router.navigate([`estudiante/aula/${this.codigoAula}/puntaje/comido/${juego.id_instancia_juego}`])
        break;
      case 2:
        this.router.navigate([`estudiante/aula/${this.codigoAula}/puntaje/sopa/${juego.id_instancia_juego}`])
        break;
      case 3:
        this.router.navigate([`estudiante/aula/${this.codigoAula}/puntaje/memorama/${juego.id_instancia_juego}`])
        break;
      case 4:
        this.router.navigate([`estudiante/aula/${this.codigoAula}/puntaje/curioso/${juego.id_instancia_juego}`])
        break;
      default:
        this.router.navigate([`estudiante/aula/${this.codigoAula}`])
        break;
    }
  }

  openModal() {
    this.myModalVar.show();
  }
}
