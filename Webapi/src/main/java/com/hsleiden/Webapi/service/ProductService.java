package com.hsleiden.Webapi.service;

import com.cloudinary.Cloudinary;
import com.hsleiden.Webapi.model.Product;
import com.hsleiden.Webapi.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
            String imageUrl = cloudinaryService.constructImageUrl(product.getImageSrc());
            product.setImageSrc(imageUrl);
        });

        return products;
    }
}

