package com.hsleiden.Webapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    private String id;
    private String title;
    private String description;
    private double price;
    private int quantity;
    private String imagePublicId;
    private String imageSrc;
    private int availability;
    @ManyToMany(mappedBy = "products")
    @JsonIgnore
    @ToString.Exclude
    private List<ShoppingCart> shoppingCarts;

    @PrePersist
    public void generateId() {
        if (id == null) {
            id = UUID.randomUUID().toString();
        }
    }

    public Product(String title, String description,
                   double price, int quantity, String imagePublicId, int availability) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.imageSrc = null;
        this.availability = availability;
        this.imagePublicId = imagePublicId;
    }

}


