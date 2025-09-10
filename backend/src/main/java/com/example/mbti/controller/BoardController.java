package com.example.mbti.controller;

import com.example.mbti.dto.BoardDto;
import com.example.mbti.dto.CommentDto;
import com.example.mbti.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/boards")
@CrossOrigin(
        origins = "http://localhost:3000",
        allowedHeaders = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}
)
public class BoardController {

    @Autowired
    private BoardService boardService;

    // 게시글 목록 (페이징 + 검색)
    @GetMapping
    public Page<BoardDto> getBoards(@RequestParam(required = false) String searchWhat,
                                    @RequestParam(required = false) String keyword, Pageable pageable) {
        return boardService.getBoards(searchWhat, keyword, pageable);
    }

    // 게시글 단건 조회
    @GetMapping("/{boardId}")
    public BoardDto getBoard(@PathVariable Long boardId) {
        return boardService.getBoard(boardId);
    }

    // 게시글 생성
    @PostMapping
    public BoardDto createBoard(@RequestBody BoardDto boardDto) {
        System.out.println("POST /api/boards called with: " + boardDto);
        return boardService.createBoard(boardDto);
    }

    // 게시글 수정
    @PutMapping("/{boardId}")
    public BoardDto updateBoard(@PathVariable Long boardId, @RequestBody BoardDto boardDto) {
        boardDto.setBoardid(boardId);
        return boardService.updateBoard(boardDto);
    }

    // 게시글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBoard(@PathVariable Long id,
                                        @RequestParam Long userId) {
        boardService.deleteBoard(id, userId);
        return ResponseEntity.ok().build();
}




    // 댓글 생성
    @PostMapping("/{boardId}/comments")
    public CommentDto createComment(@PathVariable Long boardId,
                                    @RequestBody CommentDto commentDto) {
        return boardService.createComment(boardId, commentDto);
    }

    // 게시글 댓글 전체 조회
    @GetMapping("/{boardId}/comments")
    public List<CommentDto> getComments(@PathVariable Long boardId) {
        return boardService.getCommentsByBoard(boardId);
    }

    // 댓글 수정
    @PutMapping("/comments/{commentId}")
    public CommentDto updateComment(@PathVariable Long commentId,
                                    @RequestBody CommentDto commentDto) {
        commentDto.setCommentID(commentId);
        return boardService.updateComment(commentDto);
    }

    // 댓글 삭제
    @DeleteMapping("/comments/{commentId}")    
    public ResponseEntity<String> deleteComment(@PathVariable Long commentId,
                                                @RequestParam Long userId) {
        Comment comment = boardService.getCommentById(commentId);
        if(!comment.getUserId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("삭제 권한이 없습니다.");
        }

        boardService.deleteComment(commentId);
        return ResponseEntity.ok("댓글 삭제 완료");
    }
}
