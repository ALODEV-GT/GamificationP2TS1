import { PagePrincipalComponent } from './../../shared/page-principal/page-principal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudianteRoutingModule } from './estudiante-routing.module';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { NavBarComponent } from 'src/app/shared/nav-bar/nav-bar.component';
import { FooterStudentComponent } from './footer-student/footer-student.component';
import { NavBarProfeComponent } from './nav-bar-profe/nav-bar-profe.component';



@NgModule({
  declarations: [
    PagePrincipalComponent,
    NavBarComponent,
    FooterComponent,
    FooterStudentComponent,
    NavBarProfeComponent
  ],
  imports: [
    CommonModule,
    EstudianteRoutingModule
  ]
})
export class EstudianteModule { }
