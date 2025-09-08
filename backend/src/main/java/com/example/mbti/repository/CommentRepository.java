package com.example.mbti.repository;


import com.example.mbti.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByBoardIdOrderByCommentIdDesc(Long boardId);
}
