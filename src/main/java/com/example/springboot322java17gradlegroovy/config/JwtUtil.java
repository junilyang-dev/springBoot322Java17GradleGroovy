package com.example.springboot322java17gradlegroovy.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class JwtUtil {

    private static String secret = "junilHeyJunilAdminjunilHeyJunilAdminjunilJunilngoAdminjunilHeyJunilAdmin";
    private static Key key;
    private static final long ACCESS_TOKEN_EXPIRATION_TIME = 1800000L; // 30분 (밀리초 단위)
    private static final long REFRESH_TOKEN_EXPIRATION_TIME = 2592000000L; // 30일 (밀리초 단위)
    private static final long REFRESH_TOKEN_RENEW_THRESHOLD = 604800000L; // 7일 (밀리초 단위)
    private static final long SENDEMAIL_TOKEN_EXPIRATION_TIME = 604800000L; // 7일 (밀리초 단위)

    private static final long PASSWORD_TOKEN_EXPIRATION_TIME = 5 * 60 * 1000L; // 5분 (밀리초 단위)

    // 토큰 저장소 (사용자 ID를 키로 사용하여 각 사용자의 현재 유효한 토큰을 저장)
    private static final ConcurrentHashMap<String, String> tokenStore = new ConcurrentHashMap<>();

    @PostConstruct
    public void init() {
        key = Keys.hmacShaKeyFor(Base64.getEncoder().encode(secret.getBytes()));
    }

    // 액세스 토큰을 생성하는 메서드 (userId와 ipAddress를 포함)
    public static String generateAccessToken(String userId, String ipAddress) {
        String token = Jwts.builder()
                .setSubject(userId)
                .claim("ip", ipAddress) // 추가 정보로 IP 주소를 포함
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();

        // 새로운 토큰을 저장하고 기존 토큰을 무효화
        tokenStore.put(userId, token);

        return token;
    }

    // 비밀번호 토큰을 생성하는 메서드
    public static String generatePWToken(String userId) {
        return Jwts.builder()
                .setSubject(userId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + SENDEMAIL_TOKEN_EXPIRATION_TIME)) //PASSWORD_TOKEN_EXPIRATION_TIME 일단 지금은 30일로 처리
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
    }

    // 리프레시 토큰을 생성하는 메서드
    public static String generateRefreshToken(String userId, String ipAddress) {
        return Jwts.builder()
                .setSubject(userId)
                .claim("ip", ipAddress)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
    }

    // 토큰의 유효성을 검사하는 메서드
    public static boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // 토큰에서 사용자 ID를 추출하는 메서드
    public static String getUserIdFromToken(String token) throws JwtException {
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        String userId = claims.getSubject();
        String storedToken = tokenStore.get(userId);
        return userId;
    }

    // 토큰을 통한 기존 접속 세션 종료
    public static boolean getUserIdChkAccount(String token, String userId) throws JwtException {
        String storedToken = tokenStore.get(userId);
//        if (storedToken == null || !storedToken.equals(token)) {
//            return false; // 저장된 토큰이 없거나, 주어진 토큰과 일치하지 않으면 무효화된 것으로 간주
//        }
        return true;
    }

    // 토큰에서 사용자 ID와 IP 주소를 추출하는 메서드
    public static String getStoredTokenIp(String userId) throws JwtException {
        // tokenStore에서 userId로 저장된 토큰을 가져옴
        String storedToken = tokenStore.get(userId);
        if (storedToken == null) {
            return null;
        }

        // 토큰에서 Claims를 파싱하여 IP 주소를 추출
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(storedToken).getBody();
        String ipAddress = claims.get("ip", String.class); // claim에서 ip 추출
        return ipAddress;
    }

    // 리프레시 토큰이 갱신이 필요한지 확인하는 메서드
    public static boolean isRefreshTokenExpiring(String token) throws JwtException {
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        Date expiration = claims.getExpiration();
        return expiration.getTime() - System.currentTimeMillis() < REFRESH_TOKEN_RENEW_THRESHOLD;
    }

    // 기존 토큰을 무효화하는 메서드 (사용자가 로그아웃할 때 호출)
    public static void invalidateToken(String userId) {
        tokenStore.remove(userId);
    }
}
