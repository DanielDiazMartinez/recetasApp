import { RecetaDTO } from "./receta.dto";

export interface IngredienteDTO {
    id: number;
    name: string;
    image: string;
    recetas: RecetaDTO[];
  }