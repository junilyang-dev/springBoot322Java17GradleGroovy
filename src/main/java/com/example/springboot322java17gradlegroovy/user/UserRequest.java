package com.example.springboot322java17gradlegroovy.user;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {

    @NotBlank(message = "아이디는 필수 입력 값입니다.")
    @Size(max=30, message = "아이디는 30자 이내로 입력해주세요.")
    @Pattern(regexp = "^[a-zA-Z0-9]*$", message = "아이디는 영문대소문자, 숫자만 입력해주세요.")
    @Schema(example = "admin")
    private String userId;

    @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
    @Size(max=30, message = "비밀번호는 30자 이내로 입력해주세요.")
    @Schema(example = "arum")
//    @Pattern(regexp = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,30}$", message = "비밀번호는 영문 대문자, 소문자, 숫자, 특수문자가 각각 1개씩 포함되어야합니다.")
    private String password;

    @NotBlank(message = "이메일은 필수 입력 값입니다.")
    @Size(max=30, message = "이메일은 50자 이내로 입력해주세요.")
    @Pattern(regexp = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$", message = "이메일 형식에 일치하지 않습니다.")
    @Schema(example = "junilyang.dev@gmail.com")
    private String email;


    public UserRequest(String userId, String password) {
        this.userId = userId;
        this.password = password;
    }
}
