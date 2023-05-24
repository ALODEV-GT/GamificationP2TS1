import { JuegoMemoramaComponent } from './../../juegos/memorama/area-estudiante/juego-memorama/juego-memorama.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MisAulasComponent } from './pages/mis-aulas/mis-aulas.component';
import { AulaComponent } from './pages/aula/aula.component';
import { PerfilComponent } from '../components/perfil/perfil.component';
import { JuegoEjecucionComidoComponent } from './pages/juego-ejecucion-comido/juego-ejecucion-comido.component';
import { JuegoEjecucionSopaComponent } from './pages/juego-ejecucion-sopa/juego-ejecucion-sopa.component';
import { JuegoEjecucionMemoramaComponent } from './pages/juego-ejecucion-memorama/juego-ejecucion-memorama.component';
import { JuegoEjecucionCuriosoComponent } from './pages/juego-ejecucion-curioso/juego-ejecucion-curioso.component';
import { PuntajeComidoComponent } from './pages/puntaje-comido/puntaje-comido.component';
import { PuntajeSopaComponent } from './pages/puntaje-sopa/puntaje-sopa.component';
import { PuntajeMemoramaComponent } from './pages/puntaje-memorama/puntaje-memorama.component';
import { PuntajeCuriosoComponent } from './pages/puntaje-curioso/puntaje-curioso.component';

const rutas: Routes = [
  {
    path: '',
    component: InicioComponent,
    children: [
      {
        path: 'mis-aulas',
        component: MisAulasComponent
      },
      {
        path: 'aula/:codigo',
        component: AulaComponent
      },
      {
        path: 'aula/:codigo/juego/comido/:id',
        component: JuegoEjecucionComidoComponent
      },
      {
        path: 'aula/:codigo/juego/sopa/:id',
        component: JuegoEjecucionSopaComponent
      },
      {
        path: 'aula/:codigo/juego/memorama/:id',
        component: JuegoMemoramaComponent
      },
      {
        path: 'aula/:codigo/juego/curioso/:id',
        component: JuegoEjecucionCuriosoComponent
      },
      {
        path: 'aula/:codigo/puntaje/comido/:id',
        component: PuntajeComidoComponent
      },
      {
        path: 'aula/:codigo/puntaje/sopa/:id',
        component: PuntajeSopaComponent
      },
      {
        path: 'aula/:codigo/puntaje/memorama/:id',
        component: PuntajeMemoramaComponent
      },
      {
        path: 'aula/:codigo/puntaje/curioso/:id',
        component: PuntajeCuriosoComponent
      },
      {
        path: 'perfil',
        component: PerfilComponent
      },
      {
        path: "**",
        redirectTo: 'mis-aulas'
      }
    ]
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(rutas)
  ], exports: [
    RouterModule
  ]
})
export class EstudianteRoutingModule { }
