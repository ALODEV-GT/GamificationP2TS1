import { Component, Input, OnInit } from '@angular/core';
import { Publicacion } from 'src/models/publicaciones/Publicacion';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from 'src/models/usuarios/Usuario';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {
  @Input() publicacion!: Publicacion;

  usuario: Usuario = new Usuario;

  comentarios = [1, 2, 3, 4, 5]

  comentariosMostrados: boolean = false;

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarioById(this.publicacion.id_usuario).subscribe((resp: Usuario) => {
      this.usuario = resp;
    })
  }

  mostrarComentarios() {
    this.comentariosMostrados = !this.comentariosMostrados;
  }

}
