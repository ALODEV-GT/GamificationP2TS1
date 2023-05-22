import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { PaginaPrincipalComponent } from './shared/pagina-principal/pagina-principal.component';
import { DemosComponent } from './shared/demos/demos/demos.component';
import { ComidoDemoComponent } from './shared/demos/comido-demo/comido-demo.component';
import { MemoramaDemoComponent } from './shared/demos/memorama-demo/memorama-demo.component';
import { SopaDemoComponent } from './shared/demos/sopa-demo/sopa-demo.component';
import { CuriosoDemoComponent } from './shared/demos/curioso-demo/curioso-demo.component';


const rutas: Routes = [
  {
    path: 'inicio',
    component: PaginaPrincipalComponent,
    children: [
      {
        path: "principal",
        component: DemosComponent
      },
      {
        path: "demo/comido",
        component: ComidoDemoComponent
      },
      {
        path: "demo/memorama",
        component: MemoramaDemoComponent
      },
      {
        path: "demo/sopa",
        component: SopaDemoComponent
      },
      {
        path: "demo/curioso",
        component: CuriosoDemoComponent
      },
      {
        path: '', redirectTo: 'principal', pathMatch: 'full'
      },
    ]
  },
  {
    //LazyLoad
    path: 'autenticacion',
    loadChildren: () => import('./autenticacion/autenticacion.module').then(
      m => m.AutenticacionModule
    )
  },
  {
    path: 'estudiante',
    loadChildren: () => import('./usuarios/estudiante/estudiante.module').then(
      m => m.EstudianteModule
    )
  },
  {
    path: 'profesor',
    loadChildren: () => import('./usuarios/profesor/profesor.module').then(
      m => m.ProfesorModule
    )
  },
  {
    path: '', redirectTo: 'autenticacion/login', pathMatch: 'full'
  },
  {
    path: '404', //Pagina de error
    component: ErrorPageComponent
  },
  {
    path: '**', //Cualquier otra pagina que no existe.
    redirectTo: '404'
  }

]
@NgModule({
  imports: [RouterModule.forRoot(rutas)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
