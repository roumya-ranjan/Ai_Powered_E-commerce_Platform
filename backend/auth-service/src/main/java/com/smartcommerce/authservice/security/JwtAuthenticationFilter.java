package com.smartcommerce.authservice.security;

import java.io.IOException;
import java.util.Collections;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.smartcommerce.authservice.repository.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{
	
	  private final JwtService jwtService;
	  
	  private final UserRepository userRepository;

	  public JwtAuthenticationFilter(JwtService jwtService, UserRepository userRepository) {
		    this.jwtService = jwtService;
		    this.userRepository = userRepository;
		}
	
	 @Override
	    protected void doFilterInternal(
	            HttpServletRequest request,
	            HttpServletResponse response,
	            FilterChain filterChain
	    ) throws ServletException, IOException {
		 
		 final String authHeader = request.getHeader("Authorization");

		 if (authHeader == null || !authHeader.startsWith("Bearer ")) {
		     filterChain.doFilter(request, response);
		     return;
		 }

		 String token = authHeader.substring(7);
		 String email = jwtService.extractEmail(token);
		 
		 var userOptional = userRepository.findByEmail(email);

		 if (userOptional.isEmpty()) {
		     filterChain.doFilter(request, response);
		     return;
		 }
		 
		 var user = userOptional.get();

		 if (jwtService.isTokenValid(token, user.getEmail())) {

			    UsernamePasswordAuthenticationToken authentication =
			            new UsernamePasswordAuthenticationToken(
			                    user.getEmail(),
			                    null,
			                    Collections.emptyList()
			            );
			    
			    authentication.setDetails(
			            new WebAuthenticationDetailsSource().buildDetails(request)
			    );

			    SecurityContextHolder.getContext().setAuthentication(authentication);
		 }

	        filterChain.doFilter(request, response);
	    }

}
