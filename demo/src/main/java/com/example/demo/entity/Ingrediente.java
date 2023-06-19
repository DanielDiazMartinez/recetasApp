package com.example.demo.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;


import jakarta.validation.constraints.NotBlank;

@Entity 
@Table(name = "ingredientes") 
public class Ingrediente {

    //entitny que tenga relacion manytomany con receta y que al crear un ingrediente se agregue la receta que pertenece

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotBlank(message = "Name is mandatory")    
    private String name;

    @ManyToMany(mappedBy = "ingredientes")
    private List<Receta> recetas = new ArrayList<Receta>();

    public Ingrediente() {
    }

    public Ingrediente(String name) {
        this.name = name;
    }

    public Ingrediente(String name, List<Receta> recetas) {
        this.name = name;
        this.recetas = recetas;
    }

    public Ingrediente(long id, String name, List<Receta> recetas) {
        this.id = id;
        this.name = name;
        this.recetas = recetas;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }



    
}