import { DemoJuegoComponent } from './game-memori-scratteg/demo-juego/demo-juego.component';
import { AreaJuegosCreadosComponent } from './game-memori-scratteg/area-juegos-creados/area-juegos-creados.component';
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

















      {
        path: 'memoramas-creados',
        component: AreaJuegosCreadosComponent
      },
      {
        path: 'demo-juego',
        component:DemoJuegoComponent
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
