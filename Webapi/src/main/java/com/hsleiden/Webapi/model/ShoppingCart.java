package com.hsleiden.Webapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShoppingCart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    public void addProduct(Product product) {
        this.products.add(product);
    }
    public void removeProduct(Product product) {
        this.products.remove(product);
    }
}
