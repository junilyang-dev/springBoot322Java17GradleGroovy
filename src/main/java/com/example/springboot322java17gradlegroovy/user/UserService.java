package com.example.springboot322java17gradlegroovy.user;

import com.example.springboot322java17gradlegroovy.util.HashUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public UserEntity loginUsers(String userId, String password) {
//        String encPassword = HashUtil.hash(password);//암호화 패스워드SHA-512
//        System.out.println(encPassword);
//        String saltPassword = HashUtil.hashWithGeneratedSalt(password);
//        System.out.println(saltPassword);
        UserEntity userEntity = new UserEntity();
        Optional<UserEntity> optionalUserEntity = userRepository.findByUserId(userId);
        if(optionalUserEntity.isPresent()) {
            userEntity = optionalUserEntity.get();
            boolean pwChk = HashUtil.verifyHash(password, userEntity.getPassword());
            if(pwChk) {//로그인 성공
                return userEntity;
            }else{//비밀번호가 일치하지 않음
                return null;
            }
        }else{//일치하는 사용자가 없음
            return null;
        }
    }
}
