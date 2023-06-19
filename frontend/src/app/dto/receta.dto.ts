import { IngredienteDTO } from "./ingrediente.dto";

export interface RecetaDTO {
    id: number;
    name: string;
    imagen: string;
    ingredientes: IngredienteDTO[];
  }