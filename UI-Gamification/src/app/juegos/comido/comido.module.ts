import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearJuegoComponent } from './crear-juego/crear-juego.component';
import { JuegoComponent } from './juego/juego.component';



@NgModule({
  declarations: [
    CrearJuegoComponent,
    JuegoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComidoModule { }
