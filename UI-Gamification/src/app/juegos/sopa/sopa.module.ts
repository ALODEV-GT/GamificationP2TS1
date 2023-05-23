import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreacionJuegoComponent } from './creacion-juego/creacion-juego.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JuegoSopaLetrasComponent } from './juego-sopa-letras/juego-sopa-letras.component';



@NgModule({
  declarations: [
    CreacionJuegoComponent,
    JuegoSopaLetrasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ], exports: [
    CreacionJuegoComponent,
    JuegoSopaLetrasComponent
  ]
})
export class SopaModule { }
