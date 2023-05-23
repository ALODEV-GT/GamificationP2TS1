import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { ComidoModule } from './juegos/comido/comido.module';
import { PaginaPrincipalComponent } from './shared/pagina-principal/pagina-principal.component';
import { PerfilComponent } from './usuarios/components/perfil/perfil.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { InicioComponent } from './shared/inicio/inicio.component';
import { DemosComponent } from './shared/demos/demos/demos.component';
import { ComidoDemoComponent } from './shared/demos/comido-demo/comido-demo.component';
import { MemoramaDemoComponent } from './shared/demos/memorama-demo/memorama-demo.component';
import { SopaDemoComponent } from './shared/demos/sopa-demo/sopa-demo.component';
import { CuriosoDemoComponent } from './shared/demos/curioso-demo/curioso-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    PaginaPrincipalComponent,
    PerfilComponent,
    NavBarComponent,
    InicioComponent,
    DemosComponent,
    ComidoDemoComponent,
    MemoramaDemoComponent,
    SopaDemoComponent,
    CuriosoDemoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComidoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
