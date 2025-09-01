package com.example.mbti.service;

import com.example.mbti.model.Board;
import com.example.mbti.model.Comment;
import com.example.mbti.model.User;
import com.example.mbti.repository.BoardRepository;
import com.example.mbti.repository.CommentRepository;
import com.example.mbti.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardCommentService {

    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    // ===================== Board =====================
    public Board saveBoard(Board board, Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            throw new IllegalArgumentException("해당 유저가 없습니다.");
        }
        board.setUser(userOpt.get());
        return boardRepository.save(board);
    }

    public Page<Board> searchByTitle(String keyword, Pageable pageable) {
        return boardRepository.findByTitleContaining(keyword, pageable);
    }

    public Page<Board> searchByUser(String keyword, Pageable pageable) {
        return boardRepository.findByUser_UseridContaining(keyword, pageable);
    }

    public Page<Board> searchByContent(String keyword, Pageable pageable) {
        return boardRepository.findByContentContaining(keyword, pageable);
    }

    public Optional<Board> getBoard(Long boardId) {
        return boardRepository.findById(boardId);
    }



    // ===================== Comment =====================
    public Comment saveComment(Comment comment, Long boardId, Long userId) {
        Optional<Board> boardOpt = boardRepository.findById(boardId);
        Optional<User> userOpt = userRepository.findById(userId);

        if (boardOpt.isEmpty() || userOpt.isEmpty()) {
            throw new IllegalArgumentException("게시글 또는 유저가 없습니다.");
        }

        comment.setBoard(boardOpt.get());
        comment.setUser(userOpt.get());

        return commentRepository.save(comment);
    }

    public Comment saveReply(Comment reply, Long parentCommentId, Long userId) {
        Optional<Comment> parentOpt = commentRepository.findById(parentCommentId);
        Optional<User> userOpt = userRepository.findById(userId);

        if (parentOpt.isEmpty() || userOpt.isEmpty()) {
            throw new IllegalArgumentException("부모 댓글 또는 유저가 없습니다.");
        }

        reply.setParent(parentOpt.get());
        reply.setBoard(parentOpt.get().getBoard());
        reply.setUser(userOpt.get());

        return commentRepository.save(reply);
    }

    public List<Comment> getCommentsByBoard(Long boardId) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 없습니다."));
        return commentRepository.findByBoardOrderByCreateAtAsc(board);
    }

    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}
