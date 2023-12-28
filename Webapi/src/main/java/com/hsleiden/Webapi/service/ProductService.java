package com.hsleiden.Webapi.service;

import com.cloudinary.Cloudinary;
import com.hsleiden.Webapi.model.Product;
import com.hsleiden.Webapi.repository.ProductRepository;
import com.hsleiden.Webapi.request.ProductRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class ProductService {


    @Autowired
    private Cloudinary cloudinary;
    @Autowired
    private CloudinaryService cloudinaryService;

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getAllProductsWithImageUrl() {
        List<Product> products = productRepository.findAll();

        // Populate the image URL for each product
        products.forEach(product -> {
            if (product.getImageSrc() == null || product.getImageSrc().isEmpty()) {
                String imageUrl = cloudinaryService.constructImageUrl(product.getImagePublicId());
                product.setImageSrc(imageUrl);
                productRepository.save(product);
            }
        });

        return products;
    }

    public Product getProductWithImageUrl(String id) {

        Product product = productRepository.findById(id).orElse(null);


        if (product != null) {
            if (product.getImageSrc() == null || product.getImageSrc().isEmpty()) {
                String imageUrl = cloudinaryService.constructImageUrl(product.getImagePublicId());
                product.setImageSrc(imageUrl);
                productRepository.save(product);
            }
        }
        return product;
    }

    public List<Product> searchProducts(String title) {
        return productRepository.findByTitleContainsIgnoreCase(title);
    }

    public Product createProduct(ProductRequest request) throws IOException {
        // Create product with builder
        Product product = Product.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .price(request.getPrice())
                .availability(request.getAvailability())
                .imagePublicId(request.getImagePublicId())
                .build();

        return productRepository.save(product);

    }

    // TODO add quantity to the shoppingCart products table
    // or just remove all this crap to save time.
    public Product updateQuantity(String id, Integer quantity) throws Exception {
    Product product = productRepository.findById(id)
        .orElseThrow(() -> new Exception("Product not found with id " + id));
    product.setQuantity(quantity);
    return productRepository.save(product);
}
}

