package com.smartcommerce.authservice.security;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
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
		 
		 	String path = request.getServletPath();
		 	
		 	if (path.startsWith("/api/auth/") ||
		            path.startsWith("/swagger-ui") ||
		            path.startsWith("/v3/api-docs")) {

		        filterChain.doFilter(request, response);
		        return;
		 	}
		 
		 final String authHeader = request.getHeader("Authorization");

		 if (authHeader == null || !authHeader.startsWith("Bearer ")) {
		     filterChain.doFilter(request, response);
		     return;
		 }

		 String token = authHeader.substring(7);
		 String email = jwtService.extractEmail(token);
		  String role = jwtService.extractRole(token); 
		 
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
			                    List.of(new SimpleGrantedAuthority("ROLE_" + role))
			            );
			    
			    authentication.setDetails(
			            new WebAuthenticationDetailsSource().buildDetails(request)
			    );

			    SecurityContextHolder.getContext().setAuthentication(authentication);
		 }

	        filterChain.doFilter(request, response);
	    }

}
