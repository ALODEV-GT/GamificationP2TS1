import { PagePrincipalComponent } from './../../shared/page-principal/page-principal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudianteRoutingModule } from './estudiante-routing.module';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { NavBarComponent } from 'src/app/shared/nav-bar/nav-bar.component';
import { FooterStudentComponent } from './footer-student/footer-student.component';
import { NavBarStudentComponent } from './nav-bar-student/nav-bar-student.component';



@NgModule({
  declarations: [
    PagePrincipalComponent,
    NavBarComponent,
    FooterComponent,
    FooterStudentComponent,
    NavBarStudentComponent
  ],
  imports: [
    CommonModule,
    EstudianteRoutingModule
  ]
})
export class EstudianteModule { }
