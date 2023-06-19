import { Component } from '@angular/core';

@Component({
  selector: 'app-crear-receta',
  templateUrl: './crear-receta.component.html',
  styleUrls: ['./crear-receta.component.scss']
})
export class CrearRecetaComponent {

  nombreReceta: string="";
  ingredientes: string[] = [];

  agregarIngrediente() {
    this.ingredientes.push('');
  }

}
