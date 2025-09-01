package com.example.mbti.controller;

import com.example.mbti.dto.LoginDto;
import com.example.mbti.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // React 개발 서버 주소
public class LoginController {

    @Autowired
    private LoginService loginService;

    // 회원가입
    @PostMapping("/register")
    public String register(@RequestBody LoginDto dto) {
        loginService.register(dto);
        return "success";
    }

    // 로그인
    @PostMapping("/login")
    public boolean login(@RequestBody LoginDto dto) {
        return loginService.login(dto.getLoginId(), dto.getPassword());
    }
}
