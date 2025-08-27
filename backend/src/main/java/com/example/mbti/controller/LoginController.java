package com.example.mbti.controller;

import com.example.mbti.dto.LoginDto;
import com.example.mbti.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class LoginController {

    @Autowired
    private LoginService userService;

    // 회원가입
    @PostMapping("/signup")
    public String signup(@RequestBody LoginDto userDto) {
        userService.register(userDto);
        return "회원가입 성공";
    }

    // 로그인
    @PostMapping("/login")
    public String login(@RequestBody LoginDto userDto) {
        boolean result = userService.login(userDto.getUserid(), userDto.getPassword());
        return result ? "로그인 성공" : "로그인 실패";
    }
}
