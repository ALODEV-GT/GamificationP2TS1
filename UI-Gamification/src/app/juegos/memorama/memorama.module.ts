import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaCreatJuegoComponent } from './area-profesor/area-creat-juego/area-creat-juego.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AreaCreatJuegoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ], exports: [
    AreaCreatJuegoComponent
  ]
})
export class MemoramaModule { }
