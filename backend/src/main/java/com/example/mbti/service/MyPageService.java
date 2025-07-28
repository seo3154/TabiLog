package com.example.mbti.service;

import com.example.mbti.entity.User;
import com.example.mbti.entity.Mbti;
import com.example.mbti.repository.UserRepository;
import com.example.mbti.repository.MbtiRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MyPageService {

    private final UserRepository userRepository;
    private final MbtiRepository mbtiRepository;

    public MyPageService(UserRepository userRepository, MbtiRepository mbtiRepository) {
        this.userRepository = userRepository;
        this.mbtiRepository = mbtiRepository;
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("유저 없음"));
    }

    public User updateMbti(Long userId, Integer mbtiId) {
        User user = getUserById(userId);
        Mbti mbti = mbtiRepository.findById(mbtiId)
                .orElseThrow(() -> new IllegalArgumentException("MBTI 없음"));
        user.setMbti(mbti);
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
