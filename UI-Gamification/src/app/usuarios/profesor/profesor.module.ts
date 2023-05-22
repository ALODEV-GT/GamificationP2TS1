import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfesorRoutingModule } from './profesor-routing.module';
import { NavBarProfeComponent } from './pages/nav-bar-profe/nav-bar-profe.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MisAulasComponent } from './pages/mis-aulas/mis-aulas.component';
import { AulaComponent } from './pages/aula/aula.component';
import { AreaCreacionComponent } from './pages/area-creacion/area-creacion.component';
import { UsuariosModule } from '../usuarios.module';
import { ComidoModule } from 'src/app/juegos/comido/comido.module';
import { CreacionComidoComponent } from './pages/creacion-comido/creacion-comido.component';
import { CreacionMemoramaComponent } from './pages/creacion-memorama/creacion-memorama.component';
import { MemoramaModule } from 'src/app/juegos/memorama/memorama.module';
import { SopaModule } from 'src/app/juegos/sopa/sopa.module';
import { CuriosoModule } from 'src/app/juegos/curioso/curioso.module';
import { CreacionSopaComponent } from './pages/creacion-sopa/creacion-sopa.component';
import { CreacionCuriosoComponent } from './pages/creacion-curioso/creacion-curioso.component';

@NgModule({
  declarations: [
    NavBarProfeComponent,
    InicioComponent,
    MisAulasComponent,
    AulaComponent,
    AreaCreacionComponent,
    CreacionComidoComponent,
    CreacionMemoramaComponent,
    CreacionSopaComponent,
    CreacionCuriosoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfesorRoutingModule,
    UsuariosModule,
    ComidoModule,
    MemoramaModule,
    SopaModule,
    CuriosoModule
  ], exports: [
  ]
})
export class ProfesorModule { }
