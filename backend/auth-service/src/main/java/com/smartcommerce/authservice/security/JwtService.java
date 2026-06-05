package com.smartcommerce.authservice.security;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
	
	@Value("${jwt.secret}")
	private String secret;

	 private Key getSigningKey() {
	        return Keys.hmacShaKeyFor(secret.getBytes());
	    }
	 
	 public String generateToken(String email, String role) {

		    return Jwts.builder()
		            .subject(email)
		            .claim("role", role)
		            .issuedAt(new Date())
		            .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
		            .signWith(getSigningKey())
		            .compact();
		}
	 
	 public String extractEmail(String token) {

		    return Jwts.parser()
		            .verifyWith((javax.crypto.SecretKey) getSigningKey())
		            .build()
		            .parseSignedClaims(token)
		            .getPayload()
		            .getSubject();
		}
	 
	 public String extractRole(String token) {
		    return (String) Jwts.parser()
		            .verifyWith((javax.crypto.SecretKey) getSigningKey())
		            .build()
		            .parseSignedClaims(token)
		            .getPayload()
		            .get("role");
		}
	 
	 public boolean isTokenValid(String token, String email) {
		    String tokenEmail = extractEmail(token);
		    return tokenEmail.equals(email) && !isTokenExpired(token);
		}
	 
	 private boolean isTokenExpired(String token) {

		    Date expiration = Jwts.parser()
		            .verifyWith((javax.crypto.SecretKey) getSigningKey())
		            .build()
		            .parseSignedClaims(token)
		            .getPayload()
		            .getExpiration();

		    return expiration.before(new Date());
		}
}
