package com.example.demo.controller;

import com.example.demo.entity.Ingrediente;
import com.example.demo.entity.Receta;
import com.example.demo.repository.IngredienteRepository;
import com.example.demo.repository.RecetaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/recetas")
public class RecetaController {

    private final RecetaRepository recetaRepository;

    private final IngredienteRepository ingredienteRepository;

    public RecetaController(RecetaRepository recetaRepository, IngredienteRepository ingredienteRepository) {
        this.recetaRepository = recetaRepository;
        this.ingredienteRepository = ingredienteRepository;
    }

    @GetMapping
    public ResponseEntity<List<Receta>> obtenerRecetas() {
        List<Receta> recetas = recetaRepository.findAll();
        return ResponseEntity.ok(recetas);
    }

    @PostMapping
    public ResponseEntity<Receta> crearReceta(@RequestBody Receta receta) {
        
        List<Ingrediente> ingredientes = receta.getIngredientes();
        if (ingredientes != null && !ingredientes.isEmpty()) {
            for (Ingrediente ingrediente : ingredientes) {
                Optional<Ingrediente> ingredienteExistente = ingredienteRepository.findById(ingrediente.getId());
                if (ingredienteExistente.isEmpty()) {
                
                    ingrediente = ingredienteRepository.save(ingrediente);
                } else {
             
                    ingrediente = ingredienteExistente.get();
                }
            }
        }
      
        recetaRepository.save(receta);
        return ResponseEntity.status(HttpStatus.CREATED).body(receta);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Receta> obtenerRecetaPorId(@PathVariable Long id) {
        Receta receta = recetaRepository.findById(id).orElse(null);
        if (receta != null) {
            return ResponseEntity.ok(receta);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Receta> actualizarReceta(@PathVariable Long id, @RequestBody Receta recetaActualizada) {
        Receta recetaExistente = recetaRepository.findById(id).orElse(null);
        if (recetaExistente != null) {
            
            recetaExistente.setName(recetaActualizada.getName());

            recetaExistente.setIngredientes(recetaActualizada.getIngredientes());

            recetaRepository.save(recetaExistente);

            return ResponseEntity.ok(recetaExistente);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarReceta(@PathVariable Long id) {
        Receta receta = recetaRepository.findById(id).orElse(null);
        if (receta != null) {
            recetaRepository.delete(receta);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
