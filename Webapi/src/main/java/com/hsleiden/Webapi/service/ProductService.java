package com.hsleiden.Webapi.service;

import com.cloudinary.Cloudinary;
import com.hsleiden.Webapi.model.Product;
import com.hsleiden.Webapi.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;

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
            if (Objects.equals(product.getImageSrc(), "")) {
                String imageUrl = cloudinaryService.constructImageUrl(product.getImagePublicId());
                product.setImageSrc(imageUrl);
            }
        });

        return products;
    }

    public Product getProductWithImageUrl(String id) {

        System.out.println("id: " + id);

        Product product = productRepository.findById(id).orElse(null);


        if (product != null) {
            if (Objects.equals(product.getImageSrc(), "")) {
                String imageUrl = cloudinaryService.constructImageUrl(product.getImagePublicId());
                System.out.println("imageUrl: " + imageUrl);
                product.setImageSrc(imageUrl);
            }
        }
        return product;
    }
}

