// src/main/java/com/example/mbti/service/MyPageService.java
package com.example.mbti.service;

import com.example.mbti.dto.UpdateMbtiRequest;
import com.example.mbti.dto.UpdateProfileRequest;
import com.example.mbti.dto.UserProfileDto;
import com.example.mbti.model.Mbti;
import com.example.mbti.model.User;
import com.example.mbti.repository.MbtiRepository;
import com.example.mbti.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;

@Service
@RequiredArgsConstructor
public class MyPageService {
    private final UserRepository userRepository;
    private final MbtiRepository mbtiRepository;

    private static final SimpleDateFormat F = new SimpleDateFormat("yyyy-MM-dd HH:mm");

    @Transactional(readOnly = true)
    public UserProfileDto getByLoginId(String loginId) {
        User u = userRepository.findByLoginId(loginId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        return toDto(u);
    }

    @Transactional
    public UserProfileDto updateProfile(String loginId, UpdateProfileRequest req) {
        User u = userRepository.findByLoginId(loginId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        if (req.getNickname() != null)
            u.setNickname(req.getNickname());
        if (req.getEmail() != null)
            u.setEmail(req.getEmail());
        if (req.getTel() != null)
            u.setTel(req.getTel());
        if (req.getIntroText() != null)
            u.setIntroText(req.getIntroText());

        try {
            return toDto(u); // dirty checking
        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException("닉네임/이메일 중복입니다.");
        }
    }

    @Transactional
    public UserProfileDto updateMbti(String loginId, UpdateMbtiRequest req) {
        if (req.getMbtiName() == null || req.getMbtiName().trim().isEmpty()) { // ✅ 자바8 대응
            throw new IllegalArgumentException("mbtiName이 비어있습니다.");
        }
        User u = userRepository.findByLoginId(loginId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        Mbti m = mbtiRepository.findByName(req.getMbtiName().toUpperCase())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 MBTI 타입입니다."));

        u.setMbti(m);
        return toDto(u);
    }

    private UserProfileDto toDto(User u) {
        return new UserProfileDto(u);
    }
}
