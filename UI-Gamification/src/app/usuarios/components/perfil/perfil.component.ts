import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from 'src/models/usuarios/Usuario';
import { Rol } from 'src/models/usuarios/Rol';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  roles: Rol[] = []
  loginForm!: FormGroup;
  rolSelect = 2
  usuario: Usuario = new Usuario()
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsuarioService,
  ) {
    this.usuario = this.userService.getUsuarioSesion()!;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      nombre: [this.usuario.nombre, [Validators.required, Validators.minLength(5)]],
      apellido: [this.usuario.apellido, [Validators.required, Validators.minLength(5)]],
      nik_name: [this.usuario.usuario, [Validators.required, Validators.minLength(5)]],
      passworde: ["", [Validators.required, Validators.minLength(5)]],
    });
  }

  clickRegistrar() {
    return
    this.userService.validateUser(this.loginForm.value).subscribe((value: Usuario) => {
      if (value) {
        if (value.id_rol != undefined) {
          Swal.fire({
            icon: "error",
            title: "Este nombre de usuario ya esta en uso",
            text: "Intenta con otro"
          })
        }
      } else {
        this.userService.saveUsurioSesion(this.loginForm.value).subscribe(
          (value: Usuario) => {
            this.usuario = value
            if (this.usuario.id_rol != undefined) {
              //this.goAreaWork()
            }
          }
        )
      }
    }
    )
  }
}
