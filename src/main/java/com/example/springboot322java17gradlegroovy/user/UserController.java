package com.example.springboot322java17gradlegroovy.user;

import com.example.springboot322java17gradlegroovy.config.JwtUtil;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(
            @RequestBody LoginRequest loginRequest,
            HttpServletRequest request
    ) {
        //접속 IP
        String clientIp = request.getRemoteAddr();
        //접속 디바이스 시작
        String userAgent = request.getHeader("User-Agent");
        String device = "";
        if (userAgent == null) {
            device = "Unknown";
        }

        if (userAgent.contains("Windows")) {
            device = "Windows PC";
        } else if (userAgent.contains("iPhone")) {
            device = "iPhone";
        } else if (userAgent.contains("iPad")) {
            device = "iPad";
        } else if (userAgent.contains("Mac OS")) {
            device = "Mac PC";
        } else if (userAgent.contains("Android")) {
            if (userAgent.contains("Mobile")) {
                device = "Android Phone";
            } else {
                device = "Android Tablet";
            }
        } else {
            device = "Unknown Device";
        }
        //접속 디바이스 끝
        //결과값을 담을 Map 생성
        Map<String, Object> resultMap = new HashMap<>();
        //ResponseBody에서 데이터 호출
        String userId = loginRequest.getUserId();
        String password = loginRequest.getPassword();
        //요청값 검증 시작
        if(userId == null) {
            resultMap.put("success", false);
            resultMap.put("message", "사용자ID를 입력해주세요.");
            resultMap.put("data", "");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resultMap);
        }
        if(password == null) {
            resultMap.put("success", false);
            resultMap.put("message", "비밀번호를 입력해주세요.");
            resultMap.put("data", "");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resultMap);
        }
        //요청값 검증 끝
        //로그인 서비스 호출
        resultMap = userService.loginUsers(userId, password, clientIp);
        return ResponseEntity.ok(resultMap);
    }

    @GetMapping("/test")
    public String test(HttpServletRequest request) {
        Map<String, Object> resultMap = new HashMap<>();
        // JWT 토큰 검증 시작
        String authorizationHeader = request.getHeader("Authorization"); // 요청 헤더에서 Authorization 헤더 값을 가져옴
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) { // Authorization 헤더가 없거나 Bearer로 시작하지 않으면
            return "";
        }
        String jwtToken = authorizationHeader.substring(7); // "Bearer " 다음의 토큰 부분만 추출
        boolean tokenChk = JwtUtil.validateToken(jwtToken);
        if(tokenChk) {
            String userId = JwtUtil.getUserIdFromToken(jwtToken); // 토큰에서 사용자 ID를 추출
            return userId;
        }else{
            return "토큰 만료";
        }
    }
}
