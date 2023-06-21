import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { RecetaDTO } from '../dto/receta.dto';
import { IngredienteDTO } from '../dto/ingrediente.dto';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  
   urlAPI: string = "http://localhost:8080/api/";


  constructor(private http: HttpClient) {}

  
  obtenerRecetas(): Observable<RecetaDTO[]> {
    return this.http.get<RecetaDTO[]>(this.urlAPI+"recetas")
  }

  addReceta(receta: RecetaDTO): Observable<RecetaDTO> {
    return this.http.post<RecetaDTO>(this.urlAPI+"recetas", receta)
  }

  eliminarReceta(id: number): Observable<RecetaDTO> {
    return this.http.delete<RecetaDTO>(this.urlAPI+"recetas/"+id)
  }
  
  modificarReceta(receta: RecetaDTO): Observable<RecetaDTO> {
    return this.http.put<RecetaDTO>(this.urlAPI+"recetas/"+receta.id, receta)
  }
}