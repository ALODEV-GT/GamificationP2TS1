import { PagePrincipalComponent } from './../../shared/page-principal/page-principal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfesorRoutingModule } from './profesor-routing.module';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { NavBarComponent } from 'src/app/shared/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    
  ], 
  imports: [
    CommonModule,
    ProfesorRoutingModule
  ], exports: [
  ]
})
export class ProfesorModule { }
