import { RecetaDTO } from "./receta.dto";

export interface IngredienteDTO {
    id: number;
    name: string;
    imagen: string;
    recetas: RecetaDTO[];
  }