package com.example.mbti.controller;

import com.example.mbti.entity.User;
import com.example.mbti.service.MyPageService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/mypage")
public class MyPageController {

    private final MyPageService myPageService;

    public MyPageController(MyPageService myPageService) {
        this.myPageService = myPageService;
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return myPageService.getAllUsers();
    }

    @GetMapping("/{userId}")
    public User getUser(@PathVariable Long userId) {
        return myPageService.getUserById(userId);
    }

    @PatchMapping("/{userId}/mbti")
    public User updateMbti(@PathVariable Long userId, @RequestParam Integer mbtiId) {
        return myPageService.updateMbti(userId, mbtiId);
    }
}
