package com.hsleiden.Webapi.controller;

import com.hsleiden.Webapi.model.ShoppingCart;
import com.hsleiden.Webapi.service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/shoppingCart")
public class ShoppingCartController {

    private final ShoppingCartService shoppingCartService;

    @Autowired
    public ShoppingCartController(ShoppingCartService shoppingCartService) {
        this.shoppingCartService = shoppingCartService;
    }


    // TODO get the shopping cart with email from the user, then get the correct shopping cart with that email and return it
    @GetMapping()
    public ResponseEntity<ShoppingCart> getShoppingCartInfo() {
        // Retrieve the currently authenticated user's username from the security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        System.out.println("Email: " + email);
        System.out.println("Authentication: " + authentication.isAuthenticated());
        System.out.println("Authentication: " + authentication.getAuthorities());

        // Call the shoppingCartService to get the shopping cart information for the user
//        ShoppingCart shoppingCart = shoppingCartService.getShoppingCartByUsername(username);

        // Return the shopping cart information in the response
        return ResponseEntity.ok().body(null);
    }
}
