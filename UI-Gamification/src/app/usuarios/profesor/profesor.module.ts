import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AreaCreatJuegoComponent } from '../../juegos/memorama/game-memori-scratteg/area-creat-juego/area-creat-juego.component';
import { ProfesorRoutingModule } from './profesor-routing.module';
import { NavBarProfeComponent } from './pages/nav-bar-profe/nav-bar-profe.component';
import { AreaJuegosCreadosComponent } from '../../juegos/memorama/game-memori-scratteg/area-juegos-creados/area-juegos-creados.component';
import { DemoJuegoComponent } from '../../juegos/memorama/game-memori-scratteg/demo-juego/demo-juego.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MisAulasComponent } from './pages/mis-aulas/mis-aulas.component';
import { AulaComponent } from './pages/aula/aula.component';
import { AreaCreacionComponent } from './pages/area-creacion/area-creacion.component';

@NgModule({
  declarations: [
    AreaCreatJuegoComponent,
    NavBarProfeComponent,
    AreaJuegosCreadosComponent,
    DemoJuegoComponent,
    InicioComponent,
    MisAulasComponent,
    AulaComponent,
    AreaCreacionComponent,
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
