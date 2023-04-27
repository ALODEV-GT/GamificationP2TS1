import { UsuarioService } from './../../../usuarios/services/usuario.service';
import { Usuario } from './../../../usuarios/models/Usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  usuario:Usuario = new Usuario();

  constructor(private formBuilder: FormBuilder,private router:Router,
              private usuarioService:UsuarioService) { }
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      nik_name:[null, Validators.required],
      passworde: [null, Validators.required],
    });
  }


  clickInciarSesion(){
    this.usuarioService.getSesionUsuario(this.loginForm.value).subscribe(
      (value: Usuario) =>{
        this.usuario=value
        console.log(this.usuario)
        if (this.usuario.rol != undefined) {
          this.goAreaWork()
        }
      }
    )
    
  }

  goAreaWork(){
    switch (this.usuario.rol) {
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

  goRegister(){
    this.router.navigate(['autenticacion/registro'])
  }


}