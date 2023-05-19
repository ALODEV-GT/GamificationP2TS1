import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfesorRoutingModule } from './profesor-routing.module';
import { NavBarProfeComponent } from './pages/nav-bar-profe/nav-bar-profe.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MisAulasComponent } from './pages/mis-aulas/mis-aulas.component';
import { AulaComponent } from './pages/aula/aula.component';
import { AreaCreacionComponent } from './pages/area-creacion/area-creacion.component';
import { UsuariosModule } from '../usuarios.module';

@NgModule({
  declarations: [
    NavBarProfeComponent,
    InicioComponent,
    MisAulasComponent,
    AulaComponent,
    AreaCreacionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfesorRoutingModule,
    UsuariosModule
  ], exports: [
  ]
})
export class ProfesorModule { }
