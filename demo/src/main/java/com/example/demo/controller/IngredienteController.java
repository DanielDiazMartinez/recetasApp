package com.example.demo.controller;

import com.example.demo.entity.Ingrediente;

import com.example.demo.repository.IngredienteRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/ingredientes")
public class IngredienteController{

    private final IngredienteRepository ingredienteRepository;


    public IngredienteController(IngredienteRepository ingredienteRepository) {
        
        this.ingredienteRepository = ingredienteRepository;
    }

    @GetMapping
    public ResponseEntity<List<Ingrediente>> obtenerIngredientes() {
        List<Ingrediente> ingredientes = ingredienteRepository.findAll();
        return ResponseEntity.ok(ingredientes);
    }

    @PostMapping
    public ResponseEntity<Ingrediente> crearIngrediente(@RequestBody Ingrediente ingrediente) {
      
       ingredienteRepository.save(ingrediente);
      
        return ResponseEntity.status(HttpStatus.CREATED).body(ingrediente);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ingrediente> obtenerRecetaPorId(@PathVariable Long id) {
        Ingrediente ingrediente = ingredienteRepository.findById(id).orElse(null);
        if (ingrediente != null) {
            return ResponseEntity.ok(ingrediente);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ingrediente> actualizarIngrediente(@PathVariable Long id, @RequestBody Ingrediente ingredienteActualizado) {
        Ingrediente ingredienteExistente = ingredienteRepository.findById(id).orElse(null);
        if (ingredienteExistente != null) {
            
            ingredienteExistente.setName(ingredienteActualizado.name());

            ingredienteRepository.save(ingredienteExistente);

            return ResponseEntity.ok(ingredienteExistente);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarReceta(@PathVariable Long id) {
        Ingrediente ingrediente = ingredienteRepository.findById(id).orElse(null);
        if (ingrediente != null) {
            ingredienteRepository.delete(ingrediente);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
