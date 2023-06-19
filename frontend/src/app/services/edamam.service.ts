import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { RecetaDTO } from '../dto/receta.dto';
import { IngredienteDTO } from '../dto/ingrediente.dto';

@Injectable({
  providedIn: 'root'
})

export class EdamamService {
  
   urlAPI: string = "https://api.edamam.com/api/recipes/v2?type=public&app_id=06381eae&app_key=a25cb389cb5522ede6f79c4ac1fc8a89&cuisineType=Mediterranean&random=true";


  constructor(private http: HttpClient) {}

  
  obtenerRecetasRandom(): Observable<RecetaDTO[]> {
    return this.http.get<any>(this.urlAPI)
      .pipe(
        map((response: any) => {
          const hits = response.hits || [];

          return hits.map((hit: any) => {
            const recipe = hit.recipe || {};
            const ingredients = recipe.ingredients || [];

            const transformedIngredients: IngredienteDTO[] = ingredients.map((ingredient: any) => {
              return {
                id: ingredient.id || 0,
                name: ingredient.food || '',
                imagen: ingredient.image || '',
                recetas: []
              };
            });

            const transformedReceta: RecetaDTO = {
              id: recipe.recipeId || 0,
              name: recipe.label || '',
              imagen: recipe.image || '',
              ingredientes: transformedIngredients
            };

            return transformedReceta;
          });
        })
      );
  }

  addFavoritos(receta:RecetaDTO){
    return this.http.post(this.urlAPI,receta)
  }
  
}