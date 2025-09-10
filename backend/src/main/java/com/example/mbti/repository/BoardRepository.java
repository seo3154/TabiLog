package com.example.mbti.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.mbti.model.Board;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Page<Board> findByTitleContaining(String title, Pageable pageable);
    Page<Board> findByContentContaining(String content, Pageable pageable);
    Page<Board> findByUser_LoginIdContaining(String loginId, Pageable pageable);
    
    // category 검색용
    Page<Board> findByCategoryContaining(String category, Pageable pageable);
}
