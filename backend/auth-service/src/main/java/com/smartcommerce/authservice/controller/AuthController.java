package com.smartcommerce.authservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartcommerce.authservice.dto.AuthResponse;
import com.smartcommerce.authservice.dto.LoginRequest;
import com.smartcommerce.authservice.dto.RegisterRequest;
import com.smartcommerce.authservice.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private final AuthService authService;
	
	  public AuthController(AuthService authService) {
	        this.authService = authService;
	    }
	  
	   @GetMapping("/health")
	    public String health() {
	        return "Auth Service Running";
	    }
	  
	  @GetMapping("/profile")
	  public String profile() {
	      return "This is a protected profile API";
	  }
	
	    @PostMapping("/register")
	    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest request) {
	        try {
	            String result = authService.register(request);
	            return ResponseEntity.ok(result);
	        } catch (Exception e) {
	            return ResponseEntity.badRequest().body(e.getMessage());
	        }
	    }
	
	    @PostMapping("/login")
	    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
	        try {
	            AuthResponse response = authService.login(request);
	            return ResponseEntity.ok(response);
	        } catch (Exception e) {
	            return ResponseEntity.badRequest().body(null);
	        }
	    }
	
}
