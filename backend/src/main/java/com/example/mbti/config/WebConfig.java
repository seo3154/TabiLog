// src/main/java/com/example/mbti/config/WebConfig.java
package com.example.mbti.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 컨트롤러에 /api 프리픽스 없으면 /** 가 안전
                // Vercel 프로덕션 도메인(네 프로젝트 도메인으로 교체)
                .allowedOrigins("https://<너의-프로덕션-도메인>.vercel.app", "http://localhost:3000")
                // 프리뷰(브랜치) 도메인까지 허용하고 싶으면: allowedOriginPatterns 사용 (Boot 2.4+)
                // .allowedOriginPatterns("https://*.vercel.app", "http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowedHeaders("*").exposedHeaders("*").allowCredentials(false).maxAge(3600);
    }
}


// src/main/java/com/example/mbti/config/WebConfig.java
// package com.example.mbti.config;

// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.servlet.config.annotation.CorsRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// @Configuration
// public class WebConfig implements WebMvcConfigurer {
// @Override
// public void addCorsMappings(CorsRegistry registry) {
// registry.addMapping("/api/**") // 너네 API prefix
// .allowedOrigins("http://localhost:3000")
// .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
// .allowedHeaders("*").exposedHeaders("*").allowCredentials(false) // withCredentials
// 안 쓰면 false 유지
// .maxAge(3600);
// }
// }
