import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudianteRoutingModule } from './estudiante-routing.module';
import { NavBarStudentComponent } from './pages/nav-bar-student/nav-bar-student.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MisAulasComponent } from './pages/mis-aulas/mis-aulas.component';
import { AulaComponent } from './pages/aula/aula.component';
import { AppModule } from 'src/app/app.module';
import { UsuariosModule } from '../usuarios.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NavBarStudentComponent,
    InicioComponent,
    MisAulasComponent,
    AulaComponent
  ],
  imports: [
    CommonModule,
    EstudianteRoutingModule,
    UsuariosModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EstudianteModule { }
