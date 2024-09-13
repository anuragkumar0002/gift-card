package com.giftcard.backend.giftcard_backend.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration  // Marks this class as a configuration class for Spring
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Allows Cross-Origin Resource Sharing (CORS) requests from "http://localhost:3000"
        // to any endpoint ("/**") in the backend, using the GET and POST HTTP methods.
        registry.addMapping("/**")  // Allow all endpoints
                .allowedOrigins("http://localhost:3000")  // Allow requests only from the React frontend running on localhost:3000
                .allowedMethods("GET", "POST", "PUT", "DELETE");  // Only allow GET and POST methods
    }
}