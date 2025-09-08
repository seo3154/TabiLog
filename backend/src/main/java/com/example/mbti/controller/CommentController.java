package com.example.mbti.controller;


import com.example.mbti.dto.CommentDtos;
import com.example.mbti.model.Comment;
import com.example.mbti.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


import java.util.List;


@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;


    @GetMapping("/board/{boardId}")
    public List<Comment> list(@PathVariable Long boardId) {
        return commentService.list(boardId);
    }


    @PostMapping
    public Comment create(@RequestBody CommentDtos.CreateReq req) {
        return commentService.create(req);
    }
}
