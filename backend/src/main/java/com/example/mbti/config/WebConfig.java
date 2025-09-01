// src/main/java/com/example/mbti/config/WebConfig.java
package com.example.mbti.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // 너네 API prefix
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowedHeaders("*").exposedHeaders("*").allowCredentials(false) // withCredentials
                                                                                 // 안 쓰면 false 유지
                .maxAge(3600);
    }
}
