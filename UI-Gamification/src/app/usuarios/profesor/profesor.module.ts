import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AreaCreatJuegoComponent } from './game-memori-scratteg/area-creat-juego/area-creat-juego.component';
import { ProfesorRoutingModule } from './profesor-routing.module';
import { NavBarProfeComponent } from './nav-bar-profe/nav-bar-profe.component';
import { FooterProfeComponent } from './footer-profe/footer-profe.component';

@NgModule({
  declarations: [
    AreaCreatJuegoComponent,
    NavBarProfeComponent,
    FooterProfeComponent,
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
