package com.example.springboot322java17gradlegroovy.config;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType; // SecuritySchemeType 열거형을 가져오기 위한 import
import io.swagger.v3.oas.annotations.security.SecurityScheme; // SecurityScheme 애노테이션을 가져오기 위한 import
import io.swagger.v3.oas.models.OpenAPI; // OpenAPI 모델을 가져오기 위한 import
import io.swagger.v3.oas.models.info.Info; // OpenAPI Info 모델을 가져오기 위한 import
import io.swagger.v3.oas.models.info.License; // OpenAPI License 모델을 가져오기 위한 import
import io.swagger.v3.oas.models.security.SecurityRequirement; // OpenAPI SecurityRequirement 모델을 가져오기 위한 import
import org.springdoc.core.models.GroupedOpenApi; // GroupedOpenApi 모델을 가져오기 위한 import
import org.springframework.context.annotation.Bean; // Spring Bean을 선언하기 위한 import
import org.springframework.context.annotation.Configuration; // Spring Configuration을 선언하기 위한 import

@Configuration // 이 클래스가 Spring의 구성 클래스임을 나타냄
@SecurityScheme(
        name = "Authorization", // 보안 스키마 이름 설정
        type = SecuritySchemeType.HTTP, // 보안 스키마 타입 설정 (HTTP)
        scheme = "bearer", // 보안 스키마 방식 설정 (Bearer)
        bearerFormat = "JWT" // Bearer 토큰의 형식을 JWT로 설정
)
@SecurityScheme(
        name = "Refresh-Token", // 보안 스키마 이름 설정
        type = SecuritySchemeType.APIKEY, // 보안 스키마 타입 설정 (APIKEY)
        in = SecuritySchemeIn.HEADER, // 헤더에 위치
        paramName = "Refresh-Token" // 헤더 이름 설정
)
public class OpenApiConfig {

    @Bean // Spring 컨텍스트에 OpenAPI Bean을 등록
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("Spring Boot REST API") // API의 제목 설정
                        .description("Spring Boot REST API Documentation") // API 설명 설정
                        .version("v1.0.0") // API 버전 설정
                        .license(new License().name("Apache 2.0").url("http://springdoc.org"))) // API 라이선스 정보 설정
                .addSecurityItem(new SecurityRequirement().addList("Authorization"))
                .addSecurityItem(new SecurityRequirement().addList("Refresh-Token")); // 보안 요구사항 추가 (Authorization 및 Refresh-Token 사용)
    }

    @Bean // Spring 컨텍스트에 GroupedOpenApi Bean을 등록
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("전체") // API 그룹 이름 설정
                .pathsToMatch("/api/**") // 이 그룹에 포함될 경로 패턴 설정
                .build(); // GroupedOpenApi 객체 생성
    }
    @Bean // Spring 컨텍스트에 GroupedOpenApi Bean을 등록
    public GroupedOpenApi hongparkApi() {
        return GroupedOpenApi.builder()
                .group("홍팍") // API 그룹 이름 설정
                .pathsToMatch("/api/articles/**", "/api/comments/**", "/api/hello", "/api/transaction-test") // 이 그룹에 포함될 경로 패턴 설정
                .build(); // GroupedOpenApi 객체 생성
    }
}

