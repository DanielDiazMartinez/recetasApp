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
@CrossOrigin("*")
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

   //post que genere los ingredientes y la receta
    @PostMapping
    public ResponseEntity<Receta> crearReceta(@RequestBody Receta receta) {
        ingredienteRepository.saveAll(receta.getIngredientes());
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
    public ResponseEntity<Receta> actualizarReceta(@PathVariable Long id, @RequestBody Receta receta) {
        Optional<Receta> recetaOptional = recetaRepository.findById(id);
        if (recetaOptional.isPresent()) {
            Receta recetaEncontrada = recetaOptional.get();
            recetaEncontrada.setName(receta.getName());
            recetaEncontrada.setIngredientes(receta.getIngredientes());
            recetaRepository.save(recetaEncontrada);
            return ResponseEntity.ok(recetaEncontrada);
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

    @PostMapping("/{id}/ingredientes")
    public ResponseEntity<Receta> agregarIngrediente(@PathVariable Long id, @RequestBody Ingrediente ingrediente) {
        Receta receta = recetaRepository.findById(id).orElse(null);
        if (receta != null) {
            ingredienteRepository.save(ingrediente);
            receta.getIngredientes().add(ingrediente);
            recetaRepository.save(receta);
            return ResponseEntity.ok(receta);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}/ingredientes/{idIngrediente}")
    public ResponseEntity<Receta> eliminarIngrediente(@PathVariable Long id, @PathVariable Long idIngrediente) {
        Receta receta = recetaRepository.findById(id).orElse(null);
        if (receta != null) {
            Ingrediente ingrediente = ingredienteRepository.findById(idIngrediente).orElse(null);
            if (ingrediente != null) {
                receta.getIngredientes().remove(ingrediente);
                recetaRepository.save(receta);
                return ResponseEntity.ok(receta);
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/favorito")
    public ResponseEntity<Receta> actualizarFavorito(@PathVariable Long id, @RequestBody Receta receta) {
        Optional<Receta> recetaOptional = recetaRepository.findById(id);
        if (recetaOptional.isPresent()) {
            recetaOptional.get().setFavorito(!recetaOptional.get().isFavorito());
            recetaRepository.save(recetaOptional.get());
            return ResponseEntity.ok(recetaOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
