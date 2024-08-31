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
        String encPassword = HashUtil.hash(password);//암호화 패스워드SHA-512
        System.out.println(encPassword);
        UserEntity userEntity = new UserEntity();
        Optional<UserEntity> optionalUserEntity = userRepository.findByUserIdAndPassword(userId, encPassword);
        if(optionalUserEntity.isPresent()) {
            userEntity = optionalUserEntity.get();
            return userEntity;
        }else{
            return null;
        }
    }
}
