import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudianteRoutingModule } from './estudiante-routing.module';
import { NavBarComponent } from 'src/app/shared/nav-bar/nav-bar.component';
import { NavBarStudentComponent } from './pages/nav-bar-student/nav-bar-student.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MisAulasComponent } from './pages/mis-aulas/mis-aulas.component';
import { AulaComponent } from './pages/aula/aula.component';



@NgModule({
  declarations: [
    NavBarComponent,
    NavBarStudentComponent,
    InicioComponent,
    MisAulasComponent,
    AulaComponent
  ],
  imports: [
    CommonModule,
    EstudianteRoutingModule
  ]
})
export class EstudianteModule { }
