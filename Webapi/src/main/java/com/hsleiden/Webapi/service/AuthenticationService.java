package com.hsleiden.Webapi.service;

import com.hsleiden.Webapi.controller.AuthenticationRequest;
import com.hsleiden.Webapi.controller.AuthenticationResponse;
import com.hsleiden.Webapi.controller.registerRequest;
import com.hsleiden.Webapi.model.Role;
import com.hsleiden.Webapi.model.ShoppingCart;
import com.hsleiden.Webapi.repository.ShoppingCartRepository;
import com.hsleiden.Webapi.repository.UserRepository;
import com.hsleiden.Webapi.model.User;
import lombok.RequiredArgsConstructor;
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
        // TODO figure out why i am getting a User account is locked exception
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (Exception e) {
            System.out.println("Exception: " + e);
        }
         var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        var jwtToken = jwtService.generateToken((UserDetails) user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
