// com.example.mbti.config.CorsConfig.java
package com.example.mbti.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                // ngrok URL이 자주 바뀌니 와일드카드 패턴으로
                .allowedOriginPatterns("https://*.ngrok-free.app")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowedHeaders("*").allowCredentials(true) // 쿠키/세션 쓰면 true
                .maxAge(3600);
    }
}
