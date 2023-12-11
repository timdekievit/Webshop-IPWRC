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

    @OneToMany(mappedBy = "shoppingCart")
    private List<Product> products;

    public ShoppingCart(User user) {
        this.user = user;
    }

    public void addProduct(Product product) {
    }
}
