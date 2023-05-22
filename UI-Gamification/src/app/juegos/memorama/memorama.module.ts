import { DemoJuegoComponent } from './area-profesor/demo-juego/demo-juego.component';
import { AreaJuegosCreadosComponent } from './area-profesor/area-juegos-creados/area-juegos-creados.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaCreatJuegoComponent } from './area-profesor/area-creat-juego/area-creat-juego.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AreaCreatJuegoComponent,
    AreaJuegosCreadosComponent,
    DemoJuegoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ], exports: [
    AreaCreatJuegoComponent,
    AreaJuegosCreadosComponent,
    DemoJuegoComponent
  ]
})
export class MemoramaModule { }
