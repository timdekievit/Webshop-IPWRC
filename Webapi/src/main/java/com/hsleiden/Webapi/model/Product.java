package com.hsleiden.Webapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

// TODO update this class to use with lombok
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long productId;
    private String title;
    private String description;
    private double price;
    private int quantity;
    private boolean isSold;
    private String imagePublicId;
    private String imageSrc;
    private int availability;
    @ManyToOne
    @JoinColumn(name = "shopping_cart_id")  // Adjust the column name accordingly
    @JsonIgnore
    private ShoppingCart shoppingCart;

    public Product(String title, String description,
                   double price, int quantity, boolean isSold, String imagePublicId, int availability, ShoppingCart shoppingCart) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.isSold = isSold;
        this.imageSrc = null;
        this.availability = availability;
        this.imagePublicId = imagePublicId;
        this.shoppingCart = shoppingCart;
    }

}


