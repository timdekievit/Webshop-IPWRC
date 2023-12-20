package com.hsleiden.Webapi.controller;

import com.hsleiden.Webapi.request.AuthenticationRequest;
import com.hsleiden.Webapi.request.registerRequest;
import com.hsleiden.Webapi.request.userUpdateRequest;
import com.hsleiden.Webapi.response.AuthenticationResponse;
import com.hsleiden.Webapi.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody registerRequest request) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PostMapping("/update")
    public ResponseEntity<AuthenticationResponse> update(@RequestBody userUpdateRequest request) {
        return ResponseEntity.ok(authenticationService.update(request));
    }

}
