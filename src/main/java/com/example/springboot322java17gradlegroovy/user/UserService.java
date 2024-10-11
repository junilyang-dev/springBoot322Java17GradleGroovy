package com.example.springboot322java17gradlegroovy.user;

import com.example.springboot322java17gradlegroovy.config.JwtUtil;
import com.example.springboot322java17gradlegroovy.util.HashUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Map<String, Object> loginUsers(String userId, String password, String clientIp) {
        Map<String, Object> resultMap = new HashMap<>();
//        String encPassword = HashUtil.hash(password);//암호화 패스워드SHA-512
//        System.out.println(encPassword);
//        String saltPassword = HashUtil.hashWithGeneratedSalt(password);
//        System.out.println(saltPassword);
        UserEntity userEntity = new UserEntity();
        Optional<UserEntity> optionalUserEntity = userRepository.findByUserId(userId);
        if(optionalUserEntity.isPresent()) {
            userEntity = optionalUserEntity.get();
            boolean pwChk = HashUtil.verifyHash(password, userEntity.getPassword());
//            Map<String, Object> resultDataMap = new HashMap<>();
//            resultDataMap.put("userId", userEntity.getUserId());
//            resultDataMap.put("userSq", userEntity.getUserSq());
//            resultDataMap.put("email", userEntity.getEmail());
            if(pwChk) {//로그인 성공
                String accessToken = JwtUtil.generateAccessToken(userEntity.getUserId(), clientIp); // 사용자 ID로 액세스 토큰 생성
                String refreshToken = JwtUtil.generateRefreshToken(userEntity.getUserId(), clientIp); // 사용자 ID로 리프레시 토큰 생성
                LoginTokenDTO loginTokenDTO = new LoginTokenDTO(accessToken, refreshToken);

                resultMap.put("success", true);
                resultMap.put("message", "로그인에 성공하였습니다.");
                resultMap.put("data", loginTokenDTO);
                return resultMap;
            }else{//비밀번호가 일치하지 않음
                resultMap.put("success", false);
                resultMap.put("message", "비밀번호가 일치하지 않습니다.");
                resultMap.put("data", "");
                return resultMap;
            }
        }else{//일치하는 사용자가 없음
            resultMap.put("success", false);
            resultMap.put("message", "해당하는 사용자가 없습니다.");
            resultMap.put("data", "");
            return resultMap;
        }
    }

    public UserEntity getUserByUserId(String userId) {
        UserEntity userEntity = new UserEntity();
        Optional<UserEntity> optionalUserEntity = userRepository.findByUserId(userId);
        if(optionalUserEntity.isPresent()) {
            userEntity = optionalUserEntity.get();
        }
        return userEntity;
    }

    public Map<String, Object> joinUser(UserRequest userRequest) {
        Map<String, Object> resultMap = new HashMap<>();
        if(checkUserIdDuplicate(userRequest.getUserId())) {
            resultMap.put("success", false);
            resultMap.put("message", "해당 아이디와 동일한 아이디가 존재합니다. 다른 아이디를 사용해주세요.");
            resultMap.put("data", "");
            return resultMap;
        }
        UserEntity userEntity = new UserEntity();
        userEntity.setUserId(userRequest.getUserId());
        userEntity.setPassword(HashUtil.hashWithGeneratedSalt(userRequest.getPassword()));
        userEntity.setEmail(userRequest.getEmail());
        userEntity.setTel(userRequest.getTel());
        userEntity = userRepository.save(userEntity);
        if(userEntity.getUserSq() != null) {
            resultMap.put("success", true);
            resultMap.put("message", "회원가입이 완료되었습니다.");
            resultMap.put("data", "");
        }else{
            resultMap.put("success", false);
            resultMap.put("message", "회원가입 실패");
            resultMap.put("data", "");
        }
        return resultMap;
    }

    /**
     * loginId 중복 체크
     * 회원가입 기능 구현 시 사용
     * 중복되면 true return
     */
    public boolean checkUserIdDuplicate(String userId) {
        return userRepository.existsByUserId(userId);
    }

    public UserEntity updateUserInfo(UserEntity userEntity, UserUpdateRequest userUpdateRequest) {
        userEntity.setEmail(userUpdateRequest.getEmail());
        userEntity.setTel(userUpdateRequest.getTel());
        userEntity = userRepository.save(userEntity);
        return userEntity;
    }
}
