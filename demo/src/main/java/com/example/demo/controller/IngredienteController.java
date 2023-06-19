package com.example.demo.controller;

import com.example.demo.entity.Ingrediente;

import com.example.demo.repository.IngredienteRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/ingredientes")
@CrossOrigin("*")
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

}
