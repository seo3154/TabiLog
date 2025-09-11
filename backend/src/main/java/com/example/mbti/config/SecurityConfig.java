package com.example.mbti.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.filter.ForwardedHeaderFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain filter(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable().authorizeHttpRequests(auth -> auth
                // 정적 리소스
                .antMatchers(HttpMethod.GET, "/", "/index.html", "/favicon.ico", "/static/**",
                        "/assets/**", "/**/*.js", "/**/*.css", "/**/*.png", "/**/*.jpg",
                        "/**/*.svg")
                .permitAll()

                // ====== 여기 추가: 게시판 조회는 공개 ======
                .antMatchers(HttpMethod.GET, "/api/board/**", "/api/boards/**", "/api/posts/**")
                .permitAll()
                // (실제 엔드포인트 경로에 맞춰 하나만 남기거나 정정해)

                // 로그인/회원가입 오픈
                .antMatchers("/api/auth/**", "/api/users/**").permitAll()

                // 그 외는 인증
                .anyRequest().authenticated());
        return http.build();
    }


    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cfg = new CorsConfiguration();
        // 로컬 + ngrok 둘 다 허용 (패턴 사용)
        cfg.setAllowedOriginPatterns(
                Arrays.asList("http://localhost:3000", "https://*.ngrok-free.app"));
        cfg.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        cfg.setAllowedHeaders(Arrays.asList("*"));
        cfg.setAllowCredentials(true); // 세션/쿠키 쓰면 true

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cfg);
        return source;
    }

    // 프록시(ngrok) 헤더 전달 받아 원래 스킴/호스트 인식하게
    @Bean
    ForwardedHeaderFilter forwardedHeaderFilter() {
        return new ForwardedHeaderFilter();
    }
}
