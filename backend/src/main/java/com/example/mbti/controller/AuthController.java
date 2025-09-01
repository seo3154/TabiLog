package com.example.mbti.controller;

import com.example.mbti.dto.LoginRequest;
import com.example.mbti.dto.UserProfileDto;
import com.example.mbti.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


// AuthController.java
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        UserProfileDto me = authService.login(req.getLoginId(), req.getPassword());
        return ResponseEntity.ok(me); // 성공 시 유저 DTO 반환
    }
}
