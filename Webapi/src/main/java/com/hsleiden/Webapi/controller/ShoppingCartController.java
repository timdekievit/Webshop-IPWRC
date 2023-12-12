package com.hsleiden.Webapi.controller;

import com.hsleiden.Webapi.model.Product;
import com.hsleiden.Webapi.model.ShoppingCart;
import com.hsleiden.Webapi.model.User;
import com.hsleiden.Webapi.repository.ProductRepository;
import com.hsleiden.Webapi.repository.ShoppingCartRepository;
import com.hsleiden.Webapi.repository.UserRepository;
import com.hsleiden.Webapi.service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/shoppingCart")
public class ShoppingCartController {

    private final ShoppingCartService shoppingCartService;

    @Autowired
    public ShoppingCartController(ShoppingCartService shoppingCartService) {
        this.shoppingCartService = shoppingCartService;
    }

    @GetMapping()
    public ResponseEntity<List<Product>> getShoppingCartInfo() {
        return ResponseEntity.ok().body(shoppingCartService.getAllProductsInCart());
    }

    @PostMapping("/addProduct")
    public ResponseEntity<List<Product>> addProductToShoppingCart(@RequestBody Map<String, String> payload) {
        return ResponseEntity.ok().body(shoppingCartService.addProductToCart(payload));
    }
}
