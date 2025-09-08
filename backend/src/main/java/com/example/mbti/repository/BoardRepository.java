package com.example.mbti.repository;


import com.example.mbti.model.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BoardRepository extends JpaRepository<Board, Long> {
    Page<Board> findByCategoryContainingAndMbtiContainingIgnoreCase(String category, String mbti,
            Pageable pageable);
}
