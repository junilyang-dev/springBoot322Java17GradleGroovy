package com.example.springboot322java17gradlegroovy.config;

import org.springframework.beans.factory.annotation.Autowired; // Spring의 의존성 주입을 위해 Autowired 어노테이션을 가져오기 위한 import
import org.springframework.context.annotation.Bean; // Spring Bean을 선언하기 위한 import
import org.springframework.context.annotation.Configuration; // Spring Configuration을 선언하기 위한 import
import org.springframework.boot.web.servlet.FilterRegistrationBean; // FilterRegistrationBean을 사용하기 위한 import
import org.springframework.web.servlet.config.annotation.CorsRegistry; // CORS 설정을 위해 CorsRegistry를 가져오기 위한 import
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer; // WebMvcConfigurer를 사용하기 위한 import

@Configuration // 이 클래스가 Spring의 구성 클래스임을 나타냄
public class WebConfig implements WebMvcConfigurer { // WebMvcConfigurer를 구현하여 CORS 설정을 추가

//    @Autowired // Spring의 의존성 주입을 사용하여 jwtRequestFilter를 주입
//    private JwtRequestFilter jwtRequestFilter;
//
//    @Bean // Spring 컨텍스트에 FilterRegistrationBean Bean을 등록
//    public FilterRegistrationBean<JwtRequestFilter> jwtFilter() {
//        FilterRegistrationBean<JwtRequestFilter> registrationBean = new FilterRegistrationBean<>(); // FilterRegistrationBean 객체 생성
//        registrationBean.setFilter(jwtRequestFilter); // JwtRequestFilter를 필터로 설정
//        registrationBean.addUrlPatterns("/api/v1/*"); // JWT 필터가 적용될 URL 패턴을 지정
//        registrationBean.addInitParameter("excludedUrls", "/api/v1/user/*");
//        return registrationBean; // 등록된 FilterRegistrationBean 객체를 반환
//    }

    @Override // WebMvcConfigurer의 메서드를 오버라이드하여 CORS 설정을 추가
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 경로에 대해 CORS 설정
                //.allowedOrigins("*") // 모든 도메인 허용
                .allowedOrigins("http://localhost:3000", "http://127.0.0.1:8080") // 허용할 프론트엔드 도메인 추가
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 허용할 HTTP 메서드
                .allowedHeaders("*") // 허용할 헤더
                .allowCredentials(true); // 자격 증명(쿠키, 인증 헤더 등)을 허용
    }
}
