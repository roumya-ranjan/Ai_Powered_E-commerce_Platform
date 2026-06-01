package com.smartcommerce.authservice.service;

import org.springframework.stereotype.Service;

import com.smartcommerce.authservice.dto.RegisterRequest;
import com.smartcommerce.authservice.entity.Role;
import com.smartcommerce.authservice.entity.User;
import com.smartcommerce.authservice.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already registered";
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(Role.CUSTOMER);

        userRepository.save(user);

        return "User registered successfully";
    }
}