package com.hsleiden.Webapi.controller;

import com.hsleiden.Webapi.model.Product;
import com.hsleiden.Webapi.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
@CrossOrigin
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProductsWithImageUrl();
    }

    @GetMapping("/{id}")
    public Product getProductWithImageUrl(@PathVariable String id) {
        return productService.getProductWithImageUrl(id);
    }
}

