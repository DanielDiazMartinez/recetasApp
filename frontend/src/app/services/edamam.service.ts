import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecetaDTO } from '../dto/receta.dto';

@Injectable({
  providedIn: 'root'
})

export class EdamamService {
  
   urlAPI: string = "https://api.edamam.com/api/recipes/v2?app_id=06381eae&app_key=a25cb389cb5522ede6f79c4ac1fc8a89&cuisineType=Mediterranean&random=true";


  constructor(private http: HttpClient) {}

  
  obtenerRecetasRandom(): Observable<RecetaDTO[]> {

    return this.http.get<RecetaDTO[]>(this.urlAPI);
  }
  
}