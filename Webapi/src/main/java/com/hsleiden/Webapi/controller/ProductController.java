package com.hsleiden.Webapi.controller;

import com.hsleiden.Webapi.model.Product;
import com.hsleiden.Webapi.request.ProductRequest;
import com.hsleiden.Webapi.service.ImageService;
import com.hsleiden.Webapi.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
@CrossOrigin
public class ProductController {

    private final ProductService productService;
    private final ImageService imageService;

    @Autowired
    public ProductController(ProductService productService, ImageService imageService) {
        this.productService = productService;
        this.imageService = imageService;
    }

@PostMapping()
public Product createProduct(
    @RequestParam("price") Double price,
    @RequestParam("availability") int availability,
    @RequestParam("description") String description,
    @RequestParam("title") String title,
    @RequestParam("image") MultipartFile image
) throws IOException {
    // Handle the file upload...
    System.out.println("Received file: " + image.getOriginalFilename());

    // Upload the image to Cloudinary
    String imageUrl = imageService.uploadImage(image);
    String imagePublicId = imageService.getPublicId(imageUrl);

    System.out.println("image URL: " + imageUrl);
    System.out.println("image public ID: " + imagePublicId);

    // Create a new ProductRequest object
    ProductRequest request = new ProductRequest();
    request.setPrice(price);
    request.setAvailability(availability);
    request.setDescription(description);
    request.setTitle(title);
    request.setImageUrl(imageUrl);
    request.setImagePublicId(imagePublicId);

    // Save the product and return the request
    return productService.createProduct(request);
}

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProductsWithImageUrl();
    }
    
    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam String title) {
        return productService.searchProducts(title);
    }

    @GetMapping("/{id}")
    public Product getProductWithImageUrl(@PathVariable String id) {
        return productService.getProductWithImageUrl(id);
    }
}

