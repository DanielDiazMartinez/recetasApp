package com.example.demo.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;

import jakarta.validation.constraints.NotBlank;

@Entity 
@Table(name = "recetas") 
public class Receta {

    @Id 
    @GeneratedValue(strategy = GenerationType.AUTO) 
    private long id;

    @NotBlank(message = "Name is mandatory") 
    private String name;

    @ManyToMany
    @JoinTable(
        name = "receta_ingredientes",
        joinColumns = @JoinColumn(name = "receta_id"),
        inverseJoinColumns = @JoinColumn(name = "ingrediente_id")
    )

    private List<Ingrediente> ingredientes =new ArrayList<Ingrediente>() ;

    public Receta() {
    }

    public Receta(String name, List<Ingrediente> ingredientes) {
        this.name = name;
        this.ingredientes = ingredientes;
        
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    
    public List<Ingrediente> getIngredientes() {
        return ingredientes;
    }

    public void setIngredientes(List<Ingrediente> ingredientes){
        this.ingredientes=ingredientes;
    }

    @Override
    public String toString() {
        return "Receta [id=" + id + ", name=" + name + ", ingredientes=" + ingredientes + "]";
    }

}