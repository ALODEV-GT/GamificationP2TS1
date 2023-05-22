import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreacionJuegoComponent } from './creacion-juego/creacion-juego.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreacionJuegoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ], exports: [
    CreacionJuegoComponent
  ]
})
export class SopaModule { }
