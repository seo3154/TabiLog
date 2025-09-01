package com.example.mbti.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.mbti.model.User;
import com.example.mbti.repository.UserRepository;
import com.example.mbti.dto.UserProfileDto;


@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserProfileDto login(String loginId, String rawPassword) {
        System.out.println("[LOGIN] id=" + loginId);
        User user = userRepository.findByLoginId(loginId)
                .orElseThrow(() -> new BadCredentialsException("invalid id"));

        boolean ok = passwordEncoder.matches(rawPassword, user.getPassword());
        System.out.println("[LOGIN] found=" + user.getLoginId() + ", matches=" + ok);

        if (!ok)
            throw new BadCredentialsException("invalid pw");
        return new UserProfileDto(user);
    }
}
