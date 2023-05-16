import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfesorRoutingModule } from './profesor-routing.module';
import { NavBarProfeComponent } from './nav-bar-profe/nav-bar-profe.component';
import { FooterProfeComponent } from './footer-profe/footer-profe.component';
import { AreaJuegosCreadosComponent } from '../../juegos/memorama/area-profesor/area-juegos-creados/area-juegos-creados.component';
import { DemoJuegoComponent } from '../../juegos/memorama/area-profesor/demo-juego/demo-juego.component';
import { AreaCreatJuegoComponent } from 'src/app/juegos/memorama/area-profesor/area-creat-juego/area-creat-juego.component';

@NgModule({
  declarations: [
    AreaCreatJuegoComponent,
    NavBarProfeComponent,
    FooterProfeComponent,
    AreaJuegosCreadosComponent,
    DemoJuegoComponent,
  ], 
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfesorRoutingModule
  ], exports: [
  ]
})
export class ProfesorModule { }
