package com.hsleiden.Webapi.repository;

import com.hsleiden.Webapi.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}

