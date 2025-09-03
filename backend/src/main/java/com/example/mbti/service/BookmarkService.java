package com.example.mbti.service;

import com.example.mbti.model.Bookmark;
import com.example.mbti.model.User;
import com.example.mbti.repository.BookmarkRepository;
import com.example.mbti.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final UserRepository userRepository;

    private User getUserOrThrow(String loginId) {
        return userRepository.findByLoginId(loginId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자: " + loginId));
    }

    @Transactional(readOnly = true)
    public List<Long> getTravelIds(String loginId) {
        Long userId = getUserOrThrow(loginId).getId();
        return bookmarkRepository.findByUserId(userId).stream().map(Bookmark::getTravelId)
                .collect(Collectors.toList());
    }

    @Transactional
    public void add(String loginId, Long travelId) {
        Long userId = getUserOrThrow(loginId).getId();
        if (!bookmarkRepository.existsByUserIdAndTravelId(userId, travelId)) {
            bookmarkRepository.save(Bookmark.builder().userId(userId).travelId(travelId).build());
        }
    }

    @Transactional
    public void remove(String loginId, Long travelId) {
        Long userId = getUserOrThrow(loginId).getId();
        bookmarkRepository.deleteByUserIdAndTravelId(userId, travelId);
    }

    @Transactional(readOnly = true)
    public boolean exists(String loginId, Long travelId) {
        Long userId = getUserOrThrow(loginId).getId();
        return bookmarkRepository.existsByUserIdAndTravelId(userId, travelId);
    }
}
