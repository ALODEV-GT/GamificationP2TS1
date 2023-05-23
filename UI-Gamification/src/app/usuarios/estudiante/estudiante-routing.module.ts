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
        component: JuegoEjecucionMemoramaComponent
      },
      {
        path: 'aula/:codigo/juego/curioso/:id',
        component: JuegoEjecucionCuriosoComponent
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
