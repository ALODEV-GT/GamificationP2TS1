import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudianteRoutingModule } from './estudiante-routing.module';
import { NavBarStudentComponent } from './pages/nav-bar-student/nav-bar-student.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MisAulasComponent } from './pages/mis-aulas/mis-aulas.component';
import { AulaComponent } from './pages/aula/aula.component';
import { AppModule } from 'src/app/app.module';
import { UsuariosModule } from '../usuarios.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JuegoEjecucionComidoComponent } from './pages/juego-ejecucion-comido/juego-ejecucion-comido.component';
import { JuegoEjecucionSopaComponent } from './pages/juego-ejecucion-sopa/juego-ejecucion-sopa.component';
import { JuegoEjecucionMemoramaComponent } from './pages/juego-ejecucion-memorama/juego-ejecucion-memorama.component';
import { JuegoEjecucionCuriosoComponent } from './pages/juego-ejecucion-curioso/juego-ejecucion-curioso.component';
import { ComidoModule } from 'src/app/juegos/comido/comido.module';


@NgModule({
  declarations: [
    NavBarStudentComponent,
    InicioComponent,
    MisAulasComponent,
    AulaComponent,
    JuegoEjecucionComidoComponent,
    JuegoEjecucionSopaComponent,
    JuegoEjecucionMemoramaComponent,
    JuegoEjecucionCuriosoComponent
  ],
  imports: [
    CommonModule,
    EstudianteRoutingModule,
    UsuariosModule,
    FormsModule,
    ReactiveFormsModule,
    ComidoModule
  ]
})
export class EstudianteModule { }
