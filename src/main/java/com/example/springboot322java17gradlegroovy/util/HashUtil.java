package com.example.springboot322java17gradlegroovy.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

public class HashUtil {

    public static String hash(String value) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-512");
            byte[] hash = md.digest(value.getBytes());
            return Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException ex) {
            return null;
        }
    }

    // 소금을 생성하는 메서드
    private static String generateSalt() {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return Base64.getEncoder().encodeToString(salt);
    }

    // 소금을 포함하여 해시를 생성하는 메서드
    public static String hashWithSalt(String value, String salt) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-512");
            String saltedValue = salt + value;  // 소금을 값 앞에 붙임
            byte[] hash = md.digest(saltedValue.getBytes());
            return Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException ex) {
            return null;
        }
    }

    // 입력된 값에 대해 소금을 생성하고, 해시값과 소금을 함께 반환하는 메서드
    public static String hashWithGeneratedSalt(String value) {
        String salt = generateSalt();  // 소금 생성
        String hash = hashWithSalt(value, salt);  // 소금을 사용하여 해시 생성
        return salt + ":" + hash;  // "소금:해시" 형식으로 반환
        //lbEa6dKbAccdUyjiZ2u+gQ==:VKkcc8+F9x0as2/L+EMhjgvQ+XcCl/6nRznRwsjakm3DUNVQLo/e0LBDv23/zv+9cKUvWbYf3vmr09eS22sBeg==
    }

    // 해시 검증을 위한 메서드
    public static boolean verifyHash(String value, String storedHashWithSalt) {
        String[] parts = storedHashWithSalt.split(":");
        if (parts.length != 2) {
            return false;
        }
        String salt = parts[0];
        System.out.println(salt);
        String hash = parts[1];
        System.out.println(hash);
        String newHash = hashWithSalt(value, salt);
        System.out.println(newHash);
        return newHash.equals(hash);  // 새로 계산한 해시와 저장된 해시 비교
    }
}
