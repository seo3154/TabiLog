package com.example.mbti.controller;

import com.example.mbti.dto.UserProfileDto;
import com.example.mbti.service.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000"}) // 리액트 개발서버 허용
public class MyPageController {

    private final MyPageService myPageService;

    @GetMapping("/{loginId}")
    public UserProfileDto getByLoginId(@PathVariable String loginId) {
        return myPageService.getByLoginId(loginId);
    }

    @GetMapping
    public List<UserProfileDto> getAll() {
        return myPageService.getAll();
    }
}
