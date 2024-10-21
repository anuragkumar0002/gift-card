package com.giftcard.backend.giftcard_backend.Util;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtTokenUtil {

    // Secret key for signing the JWT; should be stored securely in a real application
    private String SECRET_KEY = "helios"; 

    // Extracts the username from the JWT token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Extracts the expiration date from the JWT token
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // Generic method to extract a specific claim from the token using a claims resolver function
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token); // Get all claims from the token
        return claimsResolver.apply(claims); // Apply the claims resolver function to get the desired claim
    }

    // Parses the JWT token and retrieves all claims
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY) // Set the signing key
                .parseClaimsJws(token) // Parse the token and get the body (claims)
                .getBody();
    }

    // Checks if the token is expired by comparing the expiration date with the current date
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Generates a new JWT token for the given user details
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>(); // Create a claims map
        return createToken(claims, userDetails.getUsername()); // Create the token
    }

    // Creates a JWT token with the specified claims and subject (username)
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims) // Set claims
                .setSubject(subject) // Set subject (username)
                .setIssuedAt(new Date(System.currentTimeMillis())) // Set the issue date
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // Set expiration date (10 hours)
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY) // Sign the token with HS256 algorithm
                .compact(); // Build and return the token
    }

    // Validates the JWT token by checking the username and expiration
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token); // Extract username from token
        // Check if the extracted username matches the provided username and if the token is not expired
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}

