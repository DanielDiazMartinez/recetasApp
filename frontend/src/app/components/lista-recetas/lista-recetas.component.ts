import { Component } from '@angular/core';
import { RecetaDTO } from 'src/app/dto/receta.dto';
import { ApiService } from 'src/app/services/api.service';
import { EdamamService } from 'src/app/services/edamam.service';

@Component({
  selector: 'app-lista-recetas',
  templateUrl: './lista-recetas.component.html',
  styleUrls: ['./lista-recetas.component.scss']
})

export class ListaRecetasComponent {
  

  recetasRandom!: RecetaDTO[];
  
  constructor(private servicio: EdamamService, private apiService: ApiService) {}

  ngOnInit() {
    this.servicio.obtenerRecetasRandom().subscribe(data=>this.recetasRandom=data);
    
  }
  
  addRecetaApi(receta: RecetaDTO) {
    this.apiService.addReceta(receta).subscribe();
  }
}
