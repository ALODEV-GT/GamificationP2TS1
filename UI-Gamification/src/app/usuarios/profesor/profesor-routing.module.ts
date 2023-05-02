import { AreaCreatJuegoComponent } from './game-memori-scratteg/area-creat-juego/area-creat-juego.component';
import { PagePrincipalComponent } from './../../shared/page-principal/page-principal.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const rutas: Routes = [
  {
    path: '',
    //component: Component0,
    children: [
      {
        path: 'page-principal',
        component:PagePrincipalComponent
      },
      {
        path: 'creat-game-memorama',
        component:AreaCreatJuegoComponent
      },
      {
        path: 'path3',
        //component: Component3
      },
      {
        path: 'path4',
        //component: Component4
      },
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
