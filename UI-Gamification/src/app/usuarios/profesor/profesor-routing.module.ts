import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const rutas: Routes = [
  {
    path: '',
    //component: Component0,
    children: [
      {
        path: 'path1',
        //component: Component1
      },
      {
        path: 'path2',
        //component: Component2
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
