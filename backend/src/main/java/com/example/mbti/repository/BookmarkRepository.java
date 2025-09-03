package com.example.mbti.repository;

import com.example.mbti.model.Bookmark;
import com.example.mbti.model.BookmarkId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, BookmarkId> {
    List<Bookmark> findByUserId(Long userId);

    boolean existsByUserIdAndTravelId(Long userId, Long travelId);

    long deleteByUserIdAndTravelId(Long userId, Long travelId);
}
