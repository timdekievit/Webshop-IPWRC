package com.hsleiden.Webapi.service;

import com.hsleiden.Webapi.model.User;
import com.hsleiden.Webapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(String id) {
        return userRepository.findById(id).orElse(null);
    }

    public User createUser(User newUser) {
        // You may want to perform validation or additional checks here
        return userRepository.save(newUser);
    }

    public User updateUser(String id, User updatedUser) {
        User existingUser = userRepository.findById(id).orElse(null);
        if (existingUser != null) {
            // Update fields based on your requirements
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPassword(updatedUser.getPassword());
            existingUser.setAdmin(updatedUser.isAdmin());
            // Update other user-related fields as needed

            return userRepository.save(existingUser);
        } else {
            return null;
        }
    }

    public boolean deleteUser(String id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
