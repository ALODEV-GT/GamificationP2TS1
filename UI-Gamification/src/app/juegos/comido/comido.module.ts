import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearJuegoComponent } from './crear-juego/crear-juego.component';
import { JuegoComponent } from './juego/juego.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CrearJuegoComponent,
    JuegoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ComidoModule { }
