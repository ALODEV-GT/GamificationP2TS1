import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MisAulasComponent } from './pages/mis-aulas/mis-aulas.component';
import { AulaComponent } from './pages/aula/aula.component';
import { AreaCreacionComponent } from './pages/area-creacion/area-creacion.component';
import { PerfilComponent } from '../components/perfil/perfil.component';
import { CreacionComidoComponent } from './pages/creacion-comido/creacion-comido.component';
import { CreacionMemoramaComponent } from './pages/creacion-memorama/creacion-memorama.component';

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
        path: 'area-creacion/comido',
        component: CreacionComidoComponent
      },
      {
        path: 'area-creacion/memorama',
        component: CreacionMemoramaComponent
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
