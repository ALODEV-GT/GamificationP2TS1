import { DemoJuegoComponent } from '../../juegos/memorama/game-memori-scratteg/demo-juego/demo-juego.component';
import { AreaJuegosCreadosComponent } from '../../juegos/memorama/game-memori-scratteg/area-juegos-creados/area-juegos-creados.component';
import { AreaCreatJuegoComponent } from '../../juegos/memorama/game-memori-scratteg/area-creat-juego/area-creat-juego.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MisAulasComponent } from './pages/mis-aulas/mis-aulas.component';
import { AulaComponent } from './pages/aula/aula.component';
import { AreaCreacionComponent } from './pages/area-creacion/area-creacion.component';
import { PerfilComponent } from '../components/perfil/perfil.component';

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
        path: 'aula',
        component: AulaComponent
      },
      {
        path: 'area-creacion',
        component: AreaCreacionComponent
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

/*
      {
        path: 'memoramas-creados',
        component: AreaJuegosCreadosComponent
      },
      {
        path: 'demo-juego',
        component: DemoJuegoComponent
      },
    ]
  },
]*/


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(rutas)
  ], exports: [
    RouterModule
  ]
})
export class ProfesorRoutingModule { }
