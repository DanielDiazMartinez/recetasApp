import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraLateralComponent } from './components/barra-lateral/barra-lateral.component';
import { ListaRecetasComponent } from './components/lista-recetas/lista-recetas.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CrearRecetaComponent } from './components/crear-receta/crear-receta.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BarraLateralComponent,
    ListaRecetasComponent,
    InicioComponent,
    CrearRecetaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
