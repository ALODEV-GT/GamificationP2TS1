import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { JuegoComponent } from './juegos/comido/juego/juego.component';
import { CrearJuegoComponent } from './juegos/comido/crear-juego/crear-juego.component';

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
  {//Este path es solamente para diseñar este juego
    path: 'pruebas-comido',
    component: JuegoComponent
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
