package com.hsleiden.Webapi.service;

import com.hsleiden.Webapi.request.AuthenticationRequest;
import com.hsleiden.Webapi.response.AuthenticationResponse;
import com.hsleiden.Webapi.request.registerRequest;
import com.hsleiden.Webapi.request.userUpdateRequest;
import com.hsleiden.Webapi.model.Role;
import com.hsleiden.Webapi.model.ShoppingCart;
import com.hsleiden.Webapi.repository.ShoppingCartRepository;
import com.hsleiden.Webapi.repository.UserRepository;
import com.hsleiden.Webapi.model.User;
import com.hsleiden.Webapi.response.UserResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final ShoppingCartRepository shoppingCartRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository userRepository, ShoppingCartRepository shoppingCartRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.shoppingCartRepository = shoppingCartRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthenticationResponse register(registerRequest request) {
        System.out.println("registerRequest: " + request);
        var user = User.builder()
                .email(request.getEmail()) // .username is the same as .email
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        userRepository.save(user);

        var shoppingCart = ShoppingCart.builder()
                .user(user)
                .build();

        shoppingCartRepository.save(shoppingCart);

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        System.out.println("AuthenticationRequest: " + request);

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getId(),
                        request.getPassword()
                )
        );

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse update(userUpdateRequest request) {
        User existingUser = (User) userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update the user's details
        existingUser.setEmail(request.getEmail());
        existingUser.setName(request.getName());
        existingUser.setAddress(request.getAddress());
        existingUser.setCity(request.getCity());
        existingUser.setZipCode(request.getZipCode());

        // Save the updated user's details
        User updatedUser = userRepository.save(existingUser);

        // Generate a new JWT token for the updated user
        var jwtToken = jwtService.generateToken((UserDetails) updatedUser);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public UserResponse getCurrentUser(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        String userId = jwtService.extractUserId(token);
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        return UserResponse.builder()
            .id(user.getId())
            .email(user.getEmail())
            .role(user.getRole())
            .name(user.getName())
            .address(user.getAddress())
            .city(user.getCity())
            .zipCode(user.getZipCode())
            .build();
    }

}
