import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaRecetasComponent } from './lista-recetas/lista-recetas.component';
const routes: Routes = [
  { path: 'recetas', component: ListaRecetasComponent },
  { path: 'inicio', component: ListaRecetasComponent },
  { path: 'explorar', component: ListaRecetasComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
