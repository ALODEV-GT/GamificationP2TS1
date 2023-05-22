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
import { CreadosComponent } from './pages/creados/creados.component';

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
