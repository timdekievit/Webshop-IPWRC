package com.hsleiden.Webapi.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.UUID;

@Entity
public class Product {

    @Id
    private String id;
    private String productId;
    private String title;
    private String description;
    private double price;
    private int quantity;
    private boolean isSold;
    private String imagePublicId;
    private String imageSrc;
    private int availability;

    public Product() {
        this.productId = generateUUID();
    }
    public Product(String title, String description,
                   double price, int quantity, boolean isSold, String imagePublicId, int availability) {
        this.id = generateUUID();
        this.productId = generateUUID();
        this.title = title;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.isSold = isSold;
        this.imageSrc = "";
        this.availability = availability;
        this.imagePublicId = imagePublicId;
    }

    private String generateUUID() {
        return UUID.randomUUID().toString();
    }

    // Getters and setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public boolean isSold() {
        return isSold;
    }

    public void setSold(boolean isSold) {
        this.isSold = isSold;
    }

    public String getImagePublicId() {
        return imagePublicId;
    }

    public void setImagePublicId(String imageSrc) {
        this.imagePublicId = imagePublicId;
    }

    public String getImageSrc() {
        return imageSrc;
    }

    public void setImageSrc(String imageSrc) {
        this.imageSrc = imageSrc;
    }

    public int getAvailability() {
        return availability;
    }

    public void setAvailability(int availability) {
        this.availability = availability;
    }
}


