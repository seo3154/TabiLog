// src/main/java/com/example/mbti/controller/MyPageController.java
package com.example.mbti.controller;

import com.example.mbti.dto.UpdateMbtiRequest;
import com.example.mbti.dto.UpdateProfileRequest;
import com.example.mbti.dto.UserProfileDto;
import com.example.mbti.service.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000"})
public class MyPageController {

    private final MyPageService myPageService;

    @GetMapping("/{loginId}")
    public UserProfileDto getByLoginId(@PathVariable String loginId) {
        return myPageService.getByLoginId(loginId);
    }

    // 프로필(닉네임/이메일/전화/소개) 수정
    @PutMapping("/{loginId}")
    public UserProfileDto updateProfile(@PathVariable String loginId,
            @RequestBody UpdateProfileRequest req) {
        return myPageService.updateProfile(loginId, req);
    }

    // MBTI 수정 (프런트: updateUserMbti(loginId, mbtiName))
    @PutMapping("/{loginId}/mbti")
    public UserProfileDto updateMbti(@PathVariable String loginId,
            @RequestBody UpdateMbtiRequest req) {
        return myPageService.updateMbti(loginId, req);
    }
}
