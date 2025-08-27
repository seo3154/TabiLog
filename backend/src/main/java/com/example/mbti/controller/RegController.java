package com.example.mbti.controller;

import com.example.mbti.dto.RegDto;
import com.example.mbti.service.RegService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // React 개발 서버 주소
public class RegController {

    @Autowired
    private RegService regService;

    @PostMapping("/reg")
    public String signup(@RequestBody RegDto dto) {
        regService.register(dto);
        return "success";
    }

    @PostMapping("/check-id")
    public boolean checkId(@RequestBody RegDto dto) {
        return regService.isUseridAvailable(dto.getUserid());
    }

    @PostMapping("/check-nickname")
    public boolean checkNickname(@RequestBody RegDto dto) {
        return regService.isNicknameAvailable(dto.getNickname());
    }
}
