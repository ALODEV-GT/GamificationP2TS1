import { DemoJuegoComponent } from './../../juegos/memorama/area-profesor/demo-juego/demo-juego.component';
import { AreaJuegosCreadosComponent } from './../../juegos/memorama/area-profesor/area-juegos-creados/area-juegos-creados.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MisAulasComponent } from './pages/mis-aulas/mis-aulas.component';
import { AulaComponent } from './pages/aula/aula.component';
import { AreaCreacionComponent } from './pages/area-creacion/area-creacion.component';
import { PerfilComponent } from '../components/perfil/perfil.component';
import { CreacionComidoComponent } from './pages/creacion-comido/creacion-comido.component';
import { CreacionMemoramaComponent } from './pages/creacion-memorama/creacion-memorama.component';
import { CreacionSopaComponent } from './pages/creacion-sopa/creacion-sopa.component';
import { CreacionCuriosoComponent } from './pages/creacion-curioso/creacion-curioso.component';
import { JuegoSopaLetrasComponent } from 'src/app/juegos/sopa/juego-sopa-letras/juego-sopa-letras.component';
import { CreadosComponent } from './pages/creados/creados.component';
import { PuntajeComidoComponent } from './pages/puntaje-comido/puntaje-comido.component';
import { PuntajeMemoramaComponent } from './pages/puntaje-memorama/puntaje-memorama.component';
import { PuntajeSopaComponent } from './pages/puntaje-sopa/puntaje-sopa.component';
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
        path: 'area-creacion',
        component: AreaCreacionComponent,

      },
      {
        path: 'creados',
        component: CreadosComponent,
      },
      {
        path: 'puntaje/comido/:id',
        component: PuntajeComidoComponent,
      },
      {
        path: 'puntaje/memorama/:id',
        component: PuntajeMemoramaComponent,
      },
      {
        path: 'puntaje/sopa/:id',
        component: PuntajeSopaComponent,
      },
      {
        path: 'puntaje/curioso/:id',
        component: PuntajeCuriosoComponent,
      },
      {
        path: 'area-creacion/comido',
        component: CreacionComidoComponent
      },
      {
        path: 'area-creacion/memorama',
        component: CreacionMemoramaComponent
      },
      {
        path: 'area-creacion/memorama/memoramas-creados',
        component: AreaJuegosCreadosComponent
      },
      {
        path: 'area-creacion/sopa',
        component: CreacionSopaComponent
      },
      {
        path: 'area-creacion/memorama/demo/:id',
        component: DemoJuegoComponent
      },
      {
        path: 'area-creacion/curioso',
        component: CreacionCuriosoComponent
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
export class ProfesorRoutingModule { }
