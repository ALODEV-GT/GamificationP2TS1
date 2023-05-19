import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicacionComponent } from './components/publicacion/publicacion.component';



@NgModule({
  declarations: [
    PublicacionComponent
  ],
  imports: [
    CommonModule,
  ], exports: [
    PublicacionComponent
  ]
})
export class UsuariosModule { }
