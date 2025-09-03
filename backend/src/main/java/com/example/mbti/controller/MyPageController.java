package com.example.mbti.controller;

import com.example.mbti.dto.UpdateMbtiRequest;
import com.example.mbti.dto.UpdateProfileRequest;
import com.example.mbti.dto.UserProfileDto;
import com.example.mbti.service.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
// @CrossOrigin(origins = "http://localhost:3000",
// methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.PATCH,
// RequestMethod.DELETE, RequestMethod.OPTIONS},
// allowedHeaders = "*", allowCredentials = "true", maxAge = 3600)
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

    // MBTI 수정
    @PutMapping("/{loginId}/mbti")
    public UserProfileDto updateMbti(@PathVariable String loginId,
            @RequestBody UpdateMbtiRequest req) {
        return myPageService.updateMbti(loginId, req);
    }
}
