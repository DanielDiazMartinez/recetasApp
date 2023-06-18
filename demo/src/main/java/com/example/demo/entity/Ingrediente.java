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

    @Id 
    @GeneratedValue(strategy = GenerationType.AUTO) 
    private long id;

    @NotBlank(message = "Name is mandatory") 
    private String name;

    @ManyToMany(mappedBy = "ingredientes")
    private List<Receta> recetas=new ArrayList<Receta>() ;

    private String image;

    public Ingrediente() {
    }

    public Ingrediente(String name,String image,List<Receta> recetas) {
        this.name = name;
        this.image=image;
        this.recetas=recetas;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public List<Receta> getRecetas(){
        return recetas;
    }

    public void setRecetas(List<Receta> recetas){
        this.recetas=recetas;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
   
    @Override
    public String toString() {
        return "Ingrediente [id=" + id + ", name=" + name + ", recetas=" + recetas + "]";
    }

  
}