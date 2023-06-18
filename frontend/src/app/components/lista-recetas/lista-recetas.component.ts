import { Component } from '@angular/core';
import { RecetaDTO } from 'src/app/dto/receta.dto';
import { EdamamService } from 'src/app/services/edamam.service';

@Component({
  selector: 'app-lista-recetas',
  templateUrl: './lista-recetas.component.html',
  styleUrls: ['./lista-recetas.component.scss']
})

export class ListaRecetasComponent {
  

  recetasRandom!: RecetaDTO[];
  
  constructor(private servicio: EdamamService) {}

  ngOnInit() {
    this.servicio.obtenerRecetasRandom().subscribe(data=>this.recetasRandom=data);
    
  }
  

}
