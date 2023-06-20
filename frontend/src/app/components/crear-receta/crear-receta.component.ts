import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecetaDTO } from 'src/app/dto/receta.dto';

@Component({
  selector: 'app-crear-receta',
  templateUrl: './crear-receta.component.html',
  styleUrls: ['./crear-receta.component.scss']
})
export class CrearRecetaComponent {

  
  recipeForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }
  
  ngOnInit() {
    this.recipeForm = this.formBuilder.group({
      name: ['', Validators.required],
      ingredients: this.formBuilder.array([])
    });
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.formBuilder.control('', Validators.required));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  submitForm() {
    if (this.recipeForm.valid) {
      console.log(this.recipeForm.value);
      // const receta: RecetaDTO = this.recipeForm.value;
      // console.log(receta);
    } else {
      //El formulario no es válido, maneja el caso según tus necesidades
    }
  }

  
}
