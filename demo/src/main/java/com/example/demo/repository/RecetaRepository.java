package com.example.demo.repository;

import com.example.demo.entity.Receta;
import org.springframework.data.jpa.repository.JpaRepository;



public interface RecetaRepository extends JpaRepository<Receta, Long> {
   
}
