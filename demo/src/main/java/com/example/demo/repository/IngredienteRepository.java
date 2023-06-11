package com.example.demo.repository;

import com.example.demo.entity.Ingrediente;
import org.springframework.data.jpa.repository.JpaRepository;



public interface IngredienteRepository extends JpaRepository<Ingrediente, Long> {
   
}
