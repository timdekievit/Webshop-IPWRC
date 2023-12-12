package com.hsleiden.Webapi.service;

import com.hsleiden.Webapi.model.Product;
import com.hsleiden.Webapi.model.ShoppingCart;
import com.hsleiden.Webapi.model.User;
import com.hsleiden.Webapi.repository.ProductRepository;
import com.hsleiden.Webapi.repository.ShoppingCartRepository;
import com.hsleiden.Webapi.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
public class ShoppingCartService {

    private final ProductRepository productRepository;
    private final ShoppingCartRepository shoppingCartRepository;
    private final UserRepository userRepository;

    public ShoppingCartService(ProductRepository productRepository, ShoppingCartRepository shoppingCartRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.shoppingCartRepository = shoppingCartRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public List<Product> addProductToCart(Map<String, String> payload) {

        User user = getAuthenticatedUser();
        ShoppingCart shoppingCart = user.getShoppingCart();

        Long id = Long.parseLong(payload.get("id"));
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        shoppingCart.addProduct(product);
        shoppingCartRepository.save(shoppingCart);
        return shoppingCart.getProducts();
    }

    public List<Product> getAllProductsInCart() {
        User user = getAuthenticatedUser();
        ShoppingCart shoppingCart = user.getShoppingCart();
        return shoppingCart.getProducts();
    }

    private User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return (User) user;
    }

    public List<Product> deleteProductFromCart(Long id) {
        User user = getAuthenticatedUser();
        ShoppingCart shoppingCart = user.getShoppingCart();

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        shoppingCart.removeProduct(product);
        shoppingCartRepository.save(shoppingCart);
        return shoppingCart.getProducts();
    }
}
