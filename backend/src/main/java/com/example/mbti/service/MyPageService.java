package com.example.mbti.service;

import com.example.mbti.dto.UserProfileDto;
import com.example.mbti.model.User;
import com.example.mbti.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MyPageService {

    private final UserRepository userRepository;

    public UserProfileDto getByLoginId(String loginId) {
        User u = userRepository.findByLoginIdWithMbti(loginId)
                .orElseThrow(() -> new IllegalArgumentException("user not found: " + loginId));
        return toDto(u);
    }

    public List<UserProfileDto> getAll() {
        return userRepository.findAllWithMbti().stream().map(this::toDto)
                .collect(Collectors.toList());
    }

    private UserProfileDto toDto(User u) {
        return UserProfileDto.builder().userId(u.getId()).loginId(u.getLoginId()).name(u.getName())
                .nickname(u.getNickname()).gender(u.getGender())
                .mbtiId(u.getMbti() != null ? u.getMbti().getId() : null)
                .mbtiName(u.getMbti() != null ? u.getMbti().getName() : null)
                .mbtiUrl(u.getMbti() != null ? u.getMbti().getUrl() : null).email(u.getEmail())
                .tel(u.getTel()).introText(u.getIntroText()).role(u.getRole())
                .regDate(u.getRegDate()).build();
    }
}
