package com.example.mbti.service;


import com.example.mbti.dto.CommentDtos;
import com.example.mbti.model.Comment;
import com.example.mbti.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;


@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;


    @Transactional(readOnly = true)
    public List<Comment> list(Long boardId) {
        return commentRepository.findByBoardIdOrderByCommentIdDesc(boardId);
    }


    @Transactional
    public Comment create(CommentDtos.CreateReq req) {
        Comment c = new Comment();
        c.setBoardId(req.getBoardId());
        c.setUserId(req.getUserId());
        c.setUserName(req.getUserName());
        c.setContent(req.getContent());
        c.setParentId(req.getParentId());
        return commentRepository.save(c);
    }
}
