package com.example.mbti.dto;

import lombok.Getter;
import lombok.Setter;

// LoginRequest.java
@Getter
@Setter
public class LoginRequest {
    private String loginId; // ⚠️ 프론트 키와 반드시 동일
    private String password;
}
