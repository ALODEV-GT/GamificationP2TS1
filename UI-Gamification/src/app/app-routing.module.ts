import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const rutas: Routes = [
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
