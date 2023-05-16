import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { CommonModule } from '@angular/common';
import { ComidoModule } from './juegos/comido/comido.module';
import { PaginaPrincipalComponent } from './shared/pagina-principal/pagina-principal.component';
import { PerfilComponent } from './usuarios/components/perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    PaginaPrincipalComponent,
    PerfilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComidoModule //Solo se importo para que funcionara el common module y formularios
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
