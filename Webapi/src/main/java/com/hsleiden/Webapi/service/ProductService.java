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
            if (product.getImageSrc() == null || product.getImageSrc().isEmpty()) {
                String imageUrl = cloudinaryService.constructImageUrl(product.getImagePublicId());
                product.setImageSrc(imageUrl);
                productRepository.save(product);
            }
        });

        return products;
    }

    public Product getProductWithImageUrl(Long id) {

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
}

