import { Component, ElementRef, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators,FormControl, AbstractControl } from '@angular/forms';
import { RecetaDTO } from 'src/app/dto/receta.dto';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-crear-receta',
  templateUrl: './crear-receta.component.html',
  styleUrls: ['./crear-receta.component.scss']
})
export class CrearRecetaComponent {

  recipeForm!: FormGroup;

  isPopupOpen: boolean = false;

  recetas: RecetaDTO[] = [];  

  constructor(private formBuilder: FormBuilder,private elementRef: ElementRef,private apiService: ApiService) { }
  
  ngOnInit() {
    this.obtenerRecetasApi();
    this.recipeForm = this.formBuilder.group({
      name: ['', Validators.required],
      ingredients: this.formBuilder.array([])
    });
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
      console.log(this.recipeForm.value);
      const receta: RecetaDTO = {
        id: 0, // Puedes asignar un valor adecuado al ID si es necesario
        name: this.recipeForm.value.name,
        imagen: '', // Asigna la ruta de la imagen si corresponde
        ingredientes: this.recipeForm.value.ingredients
      };
     
    } else {
    
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
    this.isPopupOpen = false;
  }

  //llamada a la apiService

  obtenerRecetasApi(){
    this.apiService.obtenerRecetas().subscribe(data =>{ 
      this.recetas = data;
      console.log(this.recetas);});
  }

}
