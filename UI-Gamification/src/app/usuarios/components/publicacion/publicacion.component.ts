import { Component, Input, OnInit } from '@angular/core';
import { Publicacion } from 'src/models/publicaciones/Publicacion';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from 'src/models/usuarios/Usuario';
import Swal from 'sweetalert2';
import { ComentarioService } from '../../services/comentario.service';
import { LikeService } from '../../services/like.service';
import { Comentario } from 'src/models/Comentarios/Comentario';
import { ComentarioI } from 'src/models/interfaces/ComentarioI';
import { Like } from 'src/models/Likes/Like';
import { NotificacionService } from '../../services/notificacion.service';
import { NotiLike } from 'src/models/notificaciones/NotiLike';
import { NotiComentario } from 'src/models/notificaciones/NotiComentario';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {
  @Input() publicacion!: Publicacion;

  usuario: Usuario = new Usuario;

  comentarios: ComentarioI[] = []

  comentariosMostrados: boolean = false;

  comentario: string = "";

  numComentarios: number = 0;
  numLikes: number = 0;

  constructor(
    private usuarioService: UsuarioService,
    private comentarioService: ComentarioService,
    private likeService: LikeService,
    private notificacionService: NotificacionService
  ) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarioById(this.publicacion.id_usuario).subscribe((resp: Usuario) => {
      this.usuario = resp;
    })
    this.getNumComentarios()
    this.getNumLikes()
  }

  getNumComentarios() {
    this.comentarioService.getNumComentarios(this.publicacion.id_publicacion).subscribe((resp) => {
      this.numComentarios = resp.total;
    })
  }

  getNumLikes() {
    this.likeService.getNumLikes(this.publicacion.id_publicacion).subscribe((resp) => {
      this.numLikes = resp.total;
    })
  }

  mostrarComentarios() {
    this.comentariosMostrados = !this.comentariosMostrados;
    if (this.comentariosMostrados) {
      this.listarComentarios()
    }
  }

  listarComentarios() {
    this.comentarioService.getComentarios(this.publicacion.id_publicacion).subscribe((resp: ComentarioI[]) => {
      this.comentarios = resp
    })
  }

  comentar() {
    if (this.comentario.trim().length == 0) {
      Swal.fire({
        icon: "error",
        title: "Vacio",
        text: "Escribe algo"
      })
      return
    }

    const usuario: Usuario = this.usuarioService.getUsuarioSesion()!;
    if (this.publicacion.id_usuario == usuario.id_usuario) {
      const nuevoComentario: Comentario = new Comentario(0, this.publicacion.id_publicacion, usuario.id_usuario, this.comentario);
      this.comentarioService.guardarComentario(nuevoComentario).subscribe((resp: Comentario) => {
        if (resp) {
          this.listarComentarios();
          this.getNumComentarios();
          this.comentario = "";
        } else {
          Swal.fire({
            icon: "error",
            title: ":C",
            text: "No se pudo comentar"
          })
        }
      })

    } else {
      const nuevoComentario: Comentario = new Comentario(0, this.publicacion.id_publicacion, usuario.id_usuario, this.comentario);
      this.comentarioService.guardarComentario(nuevoComentario).subscribe((resp: Comentario) => {
        if (resp) {
          const nuevaNoti: NotiComentario = new NotiComentario(0, this.publicacion.id_usuario, resp.id_comentario, false);
          this.notificacionService.guardarNotiComentario(nuevaNoti).subscribe((resp: boolean) => {
            if (resp) {
              this.listarComentarios();
              this.getNumComentarios();
              this.comentario = "";
            } else {
              Swal.fire({
                icon: "error",
                title: ":C",
                text: "No se pudo crear la notifiacion del comentario"
              })
            }
          })
        } else {
          Swal.fire({
            icon: "error",
            title: ":C",
            text: "No se pudo comentar"
          })
        }
      })
    }


  }

  like() {
    const usuario: Usuario = this.usuarioService.getUsuarioSesion()!;
    if (this.publicacion.id_usuario == usuario.id_usuario) {
      this.likeService.dislike(this.publicacion.id_publicacion, usuario.id_usuario).subscribe((resp: boolean) => {
        if (resp) {
          this.getNumLikes()
        } else {
          const nuevoLike: Like = new Like(0, this.publicacion.id_publicacion, usuario.id_usuario);
          this.likeService.guardarLike(nuevoLike).subscribe((resp: Like) => {
            if (resp) {
              this.getNumLikes()
            } else {
              Swal.fire({
                icon: "error",
                title: ":C",
                text: "No se pudo realizar el like"
              })
            }
          })
        }
      })
    } else {
      //Buscar si no existe el like
      this.notificacionService.quitarNotiLike(this.publicacion.id_publicacion, usuario.id_usuario).subscribe((resp) => {
        if (resp) {
          this.likeService.dislike(this.publicacion.id_publicacion, usuario.id_usuario).subscribe((resp: boolean) => {
            if (resp) {
              this.getNumLikes()
            }
          })
        } else {
          const nuevoLike: Like = new Like(0, this.publicacion.id_publicacion, usuario.id_usuario);
          this.likeService.guardarLike(nuevoLike).subscribe((resp: Like) => {
            if (resp) {
              this.getNumLikes()


              const nuvaNotiLike: NotiLike = new NotiLike(0, this.publicacion.id_usuario, resp.id_like, false);
              this.notificacionService.guardarNotiLike(nuvaNotiLike).subscribe((resp: boolean) => {
                if (!resp) {
                  Swal.fire({
                    icon: "error",
                    title: ":C",
                    text: "No se pudo crear la notifiacion del like"
                  })
                }
              })

            } else {
              Swal.fire({
                icon: "error",
                title: ":C",
                text: "No se pudo realizar el like"
              })
            }
          })
        }
      })
    }
  }

}
