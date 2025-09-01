package com.example.mbti.repository;

import com.example.mbti.model.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {

    Page<Board> findByTitleContaining(String keyword, Pageable pageable);
    //  => select * from Board where title like "%keyword%";

    Page<Board> findByUser_UseridContaining(String keyword, Pageable pageable);
    //  => select * from Board where userId like "%keyword%";

    Page<Board> findByContentContaining(String keyword, Pageable pageable);
    //  => select * from Board where content like "%keyword%";

}