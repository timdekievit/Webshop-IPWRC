package com.hsleiden.Webapi.repository;

import com.hsleiden.Webapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    // Add custom queries if needed
}
