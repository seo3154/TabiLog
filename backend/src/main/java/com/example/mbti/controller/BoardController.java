package com.example.mbti.controller;

import com.example.mbti.dto.BoardDto;
import com.example.mbti.dto.CommentDto;
import com.example.mbti.model.Board;
import com.example.mbti.service.BoardService;
import com.example.mbti.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/boards")
@CrossOrigin(origins = "http://localhost:3000")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @Autowired
    private CommentService commentService;

    // 게시글 목록 (페이징 + 검색)
    @GetMapping
    public Page<BoardDto> getBoards(@RequestParam(required = false) String searchWhat,
                                    @RequestParam(required = false) String keyword,
                                    Pageable pageable) {
        return boardService.getBoards(searchWhat, keyword, pageable);
    }

    // 게시글 단건 조회 (조회수 증가 포함)
    @GetMapping("/{boardId}")
    public BoardDto getBoard(@PathVariable Long boardId) {
        return boardService.getBoard(boardId);
    }

    // 게시글 생성
    @PostMapping
    public BoardDto createBoard(@RequestBody BoardDto boardDto) {
        return boardService.createBoard(boardDto);
    }

    // 게시글 수정
    @PutMapping("/{boardId}")
    public BoardDto updateBoard(@PathVariable Long boardId, @RequestBody BoardDto boardDto) {
        boardDto.setBoardID(boardId);
        return boardService.updateBoard(boardDto);
    }

    // 게시글 삭제
    @DeleteMapping("/{boardId}")
    public String deleteBoard(@PathVariable Long boardId) {
        boardService.deleteBoard(boardId);
        return "삭제 완료";
    }

    // 댓글 생성 (대댓글 포함)
    @PostMapping("/{boardId}/comments")
    public CommentDto createComment(@PathVariable Long boardId,
                                    @RequestBody CommentDto commentDto) {
        return commentService.createComment(boardId, commentDto);
    }

    // 댓글 조회 (게시글의 댓글 모두)
    @GetMapping("/{boardId}/comments")
    public List<CommentDto> getComments(@PathVariable Long boardId) {
        return commentService.getCommentsByBoard(boardId);
    }

    // 댓글 수정
    @PutMapping("/comments/{commentId}")
    public CommentDto updateComment(@PathVariable Long commentId,
                                    @RequestBody CommentDto commentDto) {
        commentDto.setCommentID(commentId);
        return commentService.updateComment(commentDto);
    }

    // 댓글 삭제
    @DeleteMapping("/comments/{commentId}")
    public String deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return "댓글 삭제 완료";
    }
}
