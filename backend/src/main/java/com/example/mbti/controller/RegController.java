package com.example.mbti.controller;

import com.example.mbti.dto.RegDto;
import com.example.mbti.service.RegService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // React 개발 서버 주소
@RequiredArgsConstructor
public class RegController {

    @Autowired
    private RegService regService;

    // 회원가입
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegDto dto) {
        regService.register(dto);
        return ResponseEntity.ok("success");
    }

    // 아이디 중복 확인
    @GetMapping("/check-id")
    public ResponseEntity<Boolean> checkId(@RequestParam String loginId) {
        return ResponseEntity.ok(regService.isLoginIdAvailable(loginId));
    }

    // 닉네임 중복 확인
    @GetMapping("/check-nickname")
    public ResponseEntity<Boolean> checkNickname(@RequestParam String nickname) {
        return ResponseEntity.ok(regService.isNicknameAvailable(nickname));
    }
}
