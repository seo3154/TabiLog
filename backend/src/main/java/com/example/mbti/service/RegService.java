package com.example.mbti.service;

import com.example.mbti.dto.RegDto;
import com.example.mbti.model.User;
import com.example.mbti.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class RegService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    // 회원가입
    public User register(RegDto dto) {
        User user = new User();
        user.setLoginId(dto.getLoginId());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setName(dto.getName());
        user.setNickname(dto.getNickname());
        user.setGender(dto.getGender());
        user.setEmail(dto.getEmail());
        user.setTel(dto.getTel());
        user.setIntroText(dto.getIntroText());
        user.setRole(0); // 기본 사용자
        user.setRegDate(new Date());
        return userRepository.save(user);
    }

    // ID 중복 체크
    public boolean isLoginIdAvailable(String loginId) {
        return !userRepository.existsByLoginId(loginId);
    }

    // 닉네임 중복 체크
    public boolean isNicknameAvailable(String nickname) {
        return !userRepository.existsByNickname(nickname);
    }
}
