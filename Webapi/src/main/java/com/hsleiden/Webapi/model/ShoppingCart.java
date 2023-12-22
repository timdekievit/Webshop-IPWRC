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
public class ShoppingCart {

    @Id
    private String id;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    @ToString.Exclude
    private User user;

    @ManyToMany
    @JoinTable(
        name = "shopping_cart_products",
        joinColumns = @JoinColumn(name = "shopping_cart_id"),
        inverseJoinColumns = @JoinColumn(name = "product_id"))
    private List<Product> products;

    public ShoppingCart(User user) {
        this.user = user;
    }

    @PrePersist
    public void generateId() {
        if (id == null) {
            id = UUID.randomUUID().toString();
        }
    }

    public void addProduct(Product product) {
        this.products.add(product);
    }
    public void removeProduct(Product product) {
        this.products.remove(product);
    }
}
