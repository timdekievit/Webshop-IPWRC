package com.hsleiden.Webapi.repository;

import com.hsleiden.Webapi.model.ShoppingCart;
import com.hsleiden.Webapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {
    ShoppingCart findByUser(User user);
}
