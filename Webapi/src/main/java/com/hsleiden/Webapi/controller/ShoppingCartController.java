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

    private final UserRepository userRepository;
    private final ShoppingCartRepository shoppingCartRepository;
    private final ProductRepository productRepository;

    @Autowired
    public ShoppingCartController(ShoppingCartService shoppingCartService, UserRepository userRepository, ShoppingCartRepository shoppingCartRepository, ProductRepository productRepository) {
        this.shoppingCartService = shoppingCartService;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.shoppingCartRepository = shoppingCartRepository;
    }


    // TODO get the shopping cart with email from the user, then get the correct shopping cart with that email and return it
    @GetMapping()
    public ResponseEntity<List<Product>> getShoppingCartInfo() {
        // Retrieve the currently authenticated user's username from the security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        System.out.println("Email: " + email);
        System.out.println("Authentication: " + authentication.isAuthenticated());
        System.out.println("Authentication: " + authentication.getAuthorities());

        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        System.out.println("User: " + user);

        User user1 = (User) user;

        System.out.println("User1: " + user1);

        ShoppingCart shoppingCart = user1.getShoppingCart();

        System.out.println("Shopping cart: " + shoppingCart);

        System.out.println("Shopping cart products: " + shoppingCart.getProducts());

        // Return the shopping cart information in the response
        return ResponseEntity.ok().body(shoppingCart.getProducts());
    }

    @PostMapping("/addProduct")
    public ResponseEntity<List<Product>> addProductToShoppingCart(@RequestBody Map<String, String> payload) {
        // Retrieve the currently authenticated user's username from the security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        System.out.println("posting to shopping cart");

        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        System.out.println("User: " + user);

        User user1 = (User) user;

        System.out.println("User1: " + user1);

        ShoppingCart shoppingCart = user1.getShoppingCart();

        Long id = Long.parseLong(payload.get("id"));
        System.out.println("Product id: " + id);
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        System.out.println("Product: " + product);

        shoppingCart.addProduct(product);
        shoppingCartRepository.save(shoppingCart);

        System.out.println("Shopping cart: " + shoppingCart);

        System.out.println("Shopping cart products: " + shoppingCart.getProducts());

        // Return the shopping cart information in the response
        return ResponseEntity.ok().body(shoppingCart.getProducts());
    }
}
