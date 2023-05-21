import { UsuarioService } from './../../../usuarios/services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/models/usuarios/Usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  usuario: Usuario = new Usuario();

  constructor(private formBuilder: FormBuilder, private router: Router,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      usuario: ["", [Validators.required, Validators.minLength(5)]],
      contrasena: ["", [Validators.required, Validators.minLength(5)]],
    });
  }

  clickInciarSesion() {
    this.usuarioService.getSesionUsuario(this.loginForm.value).subscribe(
      (value: Usuario) => {
        if (value) {
          this.usuario = value
          if (this.usuario.id_rol != undefined) {
            this.goAreaWork()
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Credenciales incorrectos",
            text: "Vuelve a intentarlo"
          })
        }
      }
    )
  }

  goAreaWork() {
    switch (this.usuario.id_rol) {
      case 1:
        this.router.navigate(['profesor/page-principal'])
        break;
      case 2:
        this.router.navigate(['estudiante/page-principal'])
        break;
      default:
        break;
    }
  }

  goRegister() {
    this.router.navigate(['autenticacion/registro'])
  }


}
