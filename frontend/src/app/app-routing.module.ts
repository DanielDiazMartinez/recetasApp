import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaRecetasComponent } from './components/lista-recetas/lista-recetas.component';
import { HttpClientModule } from '@angular/common/http';
import { InicioComponent } from './components/inicio/inicio.component';
import { CrearRecetaComponent } from './components/crear-receta/crear-receta.component';
const routes: Routes = [
  { path: 'recetas', component: CrearRecetaComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'explorar', component: ListaRecetasComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule,],
  exports: [RouterModule]
})
export class AppRoutingModule { }
