package com.smartcommerce.authservice.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.smartcommerce.authservice.dto.LoginRequest;
import com.smartcommerce.authservice.dto.RegisterRequest;
import com.smartcommerce.authservice.entity.Role;
import com.smartcommerce.authservice.entity.User;
import com.smartcommerce.authservice.repository.UserRepository;
import com.smartcommerce.authservice.security.JwtService;

@Service
public class AuthService {

    private final UserRepository userRepository;
    
    private final PasswordEncoder passwordEncoder;
    
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

    		this.userRepository = userRepository;
    		this.passwordEncoder = passwordEncoder;
    		this.jwtService = jwtService;
    }

    public String register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already registered";
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.CUSTOMER);

        userRepository.save(user);

        return "User registered successfully";
    }
    
    public String login(LoginRequest request) {

        Optional<User> optionalUser =
                userRepository.findByEmail(request.getEmail());

        if (optionalUser.isEmpty()) {
            return "Invalid Email";
        }

        User user = optionalUser.get();

        boolean matches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword());

        if (!matches) {
            return "Invalid Password";
        }

        String token = jwtService.generateToken(user.getEmail());

        return token;
    }
}