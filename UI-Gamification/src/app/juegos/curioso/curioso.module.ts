import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreacionJuegoCuriosoComponent } from './creacion-juego-curioso/creacion-juego-curioso.component';



@NgModule({
  declarations: [
    CreacionJuegoCuriosoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ], exports: [
    CreacionJuegoCuriosoComponent
  ]
})
export class CuriosoModule { }
