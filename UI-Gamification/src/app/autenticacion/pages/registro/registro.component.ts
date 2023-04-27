import { Usuario } from './../../../usuarios/models/Usuario';
import { UsuarioService } from './../../../usuarios/services/usuario.service';
import { Router } from '@angular/router';
import { RolService } from './../../services/rol.service';
import { Rol } from './../../models/Rol';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  roles:Rol[]=[]
  loginForm!: FormGroup;
  rolSelect = 2
  usuario:Usuario= new Usuario()
  constructor(private formBuilder: FormBuilder,private rolService:RolService,
              private router:Router, private userService:UsuarioService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      nombre: [null, Validators.required],
      apellido:[null, Validators.required],
      nik_name:[null, Validators.required],
      rol:[this.rolSelect],
      passworde: [null, Validators.required],
    });
    this.rolService.getRoles().subscribe(
      (value: Rol[]) =>{
        this.roles= value
      }
    )
  }

  clickRegisstrar(){
    this.userService.saveUsurioSesion(this.loginForm.value).subscribe(
      (value: Usuario) =>{
        this.usuario= value
        console.log(value)
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

  clickRolSelect(index:number){
    this.loginForm.value.rol = this.roles[index].tipo_rol
  }

}
