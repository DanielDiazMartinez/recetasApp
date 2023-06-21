import { Component, ElementRef, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators,FormsModule , AbstractControl } from '@angular/forms';
import { RecetaDTO } from 'src/app/dto/receta.dto';
import { ApiService } from 'src/app/services/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { EdamamService } from 'src/app/services/edamam.service';


@Component({
  selector: 'app-crear-receta',
  templateUrl: './crear-receta.component.html',
  styleUrls: ['./crear-receta.component.scss']
})
export class CrearRecetaComponent {

  recipeForm!: FormGroup;

  isPopupOpen: boolean = false;

  recetas: RecetaDTO[] = [];  

  filtroNombre!: string; 

  isModifying: boolean = false;
  
  constructor(private formBuilder: FormBuilder,private elementRef: ElementRef,private apiService: ApiService,private edamanService: EdamamService) { }
  
  ngOnInit() {
    this.obtenerRecetasApi();
    this.recipeForm = this.formBuilder.group({
      id: [null], 
      name: ['', Validators.required],
      ingredients: this.formBuilder.array([])
    });
    this.obtenerImagenesRecetasByName();
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.formBuilder.group({
      name: ['', [Validators.required]]
    }));
  }

  getIngredientFormControls(): AbstractControl[] {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }
  removeIngredient(index: number,event: Event) {
    event.stopPropagation();
    this.ingredients.removeAt(index);
  }

  submitForm() {
    if (this.recipeForm.valid) {
      
  
      if (this.isModifying) {
        // Realizar la lógica de modificación
        const receta: RecetaDTO = {
          id: this.recipeForm.value.id,
          name: this.recipeForm.value.name,
          imagen: '',
          ingredientes: this.recipeForm.value.ingredients
        };
        console.log(receta);
        this.addRecetaApi(receta);
        this.isModifying = false;
        
      } else {
        // Realizar la lógica de creación
        const receta: RecetaDTO = {
          id: 0,
          name: this.recipeForm.value.name,
          imagen: '',
          ingredientes: this.recipeForm.value.ingredients
        };
        this.addRecetaApi(receta);
        this.obtenerImagenesRecetasByName() 
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  hasInvalidIngredient(): boolean {
    const ingredientControls = this.getIngredientFormControls();
    return ingredientControls.some(control => control.invalid);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closePopup();
    }
  }

  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    const ingredientsArray = this.recipeForm.get('ingredients') as FormArray;
    ingredientsArray.clear();
    this.recipeForm.reset();
    this.isPopupOpen = false;
  }

 
  cargarRecetaExistente(receta: RecetaDTO) {
    this.recipeForm.patchValue({
      id: receta.id,
      name: receta.name
    });
  
    const ingredientControls = this.recipeForm.get('ingredients') as FormArray;
    ingredientControls.clear();
  
    receta.ingredientes.forEach(ingrediente => {
      ingredientControls.push(
        this.formBuilder.group({
          name: [ingrediente.name, Validators.required]
        })
      );
    });
    this.isModifying = true;
    this.isPopupOpen = true;
  }

  addRecetaApi(receta: RecetaDTO) {

    const existeReceta = this.recetas.find(r => r.name === receta.name);
  
    if (existeReceta) {
      console.log('La receta ya existe:');
      
    } else {
      this.apiService.addReceta(receta).subscribe(data => {
        this.recetas.push(data);
        
      });
    }
  }

  eliminarRecetaApi(receta: RecetaDTO) {
    this.apiService.eliminarReceta(receta.id).subscribe(data => {
      this.recetas = this.recetas.filter(r => r.id !== receta.id);
    });
  }


  obtenerRecetasApi() {
    this.apiService.obtenerRecetas().subscribe(data => { 
      this.recetas = data;
      console.log(this.recetas);
      this.obtenerImagenesRecetasByName(); // Llamar al método para obtener las imágenes después de obtener las recetas
    });
  }
  
  obtenerImagenesRecetasByName() {
    this.recetas.forEach(receta => {
      this.edamanService.obtenerImagenRecetaByName(receta.name).subscribe(data => {
        if (data.hits.length > 0) {
          const imagen = data.hits[0].recipe.image;
          receta.imagen = imagen;
        }
      });
    });
  }
}
