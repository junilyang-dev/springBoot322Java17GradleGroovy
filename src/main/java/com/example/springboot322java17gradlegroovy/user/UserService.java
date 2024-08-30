package com.example.springboot322java17gradlegroovy.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public UserEntity loginUsers(String userId, String password) {
        UserEntity userEntity = new UserEntity();
        Optional<UserEntity> optionalUserEntity = userRepository.findByUserIdAndPassword(userId, password);
        if(optionalUserEntity.isPresent()) {
            userEntity = optionalUserEntity.get();
            return userEntity;
        }else{
            return null;
        }
    }
}
