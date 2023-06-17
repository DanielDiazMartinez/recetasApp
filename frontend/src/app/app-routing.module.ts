import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaRecetasComponent } from './components/lista-recetas/lista-recetas.component';
import { HttpClientModule } from '@angular/common/http';
const routes: Routes = [
  { path: 'recetas', component: ListaRecetasComponent },
  { path: 'inicio', component: ListaRecetasComponent },
  { path: 'explorar', component: ListaRecetasComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule,],
  exports: [RouterModule]
})
export class AppRoutingModule { }
