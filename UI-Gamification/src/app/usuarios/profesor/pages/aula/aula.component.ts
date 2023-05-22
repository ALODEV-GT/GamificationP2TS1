import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { PublicacionService } from '../../../services/publicacion.service';
import { Publicacion } from 'src/models/publicaciones/Publicacion';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from 'src/models/usuarios/Usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aula',
  templateUrl: './aula.component.html',
  styleUrls: ['./aula.component.css']
})
export class AulaComponent implements OnInit {
  @ViewChild('myModal', { static: true }) myModal!: ElementRef

  miembros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  myModalVar: any;

  codigoAula: string = "";

  //nueva publicacion
  contenido: string = "";

  usuario!: Usuario;
  publicaciones: Publicacion[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private publicacionService: PublicacionService,
    private usuarioService: UsuarioService
  ) {
    this.usuario = this.usuarioService.getUsuarioSesion()!;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ codigo }) => {
      //Mostrar miembros
      this.codigoAula = codigo;
      this.listarPublicaciones()
    })

    const myModal = this.myModal.nativeElement;
    this.myModalVar = new bootstrap.Modal(myModal);
  }

  listarPublicaciones() {
    this.publicacionService.getPublicaciones(this.codigoAula).subscribe((resp: Publicacion[]) => {
      this.publicaciones = resp;
    })
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

  openModal() {
    this.myModalVar.show();
  }

}
