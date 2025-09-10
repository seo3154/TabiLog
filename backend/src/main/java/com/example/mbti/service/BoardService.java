package com.example.mbti.service;

import com.example.mbti.dto.BoardDto;
import com.example.mbti.dto.CommentDto;
import com.example.mbti.model.Board;
import com.example.mbti.model.Comment;
import com.example.mbti.model.User;
import com.example.mbti.repository.BoardRepository;
import com.example.mbti.repository.CommentRepository;
import com.example.mbti.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    // ================= Board =================
    public Page<BoardDto> getBoards(String searchWhat, String keyword, Pageable pageable) {

        Pageable sortedPageable = PageRequest.of(
            pageable.getPageNumber(),
            pageable.getPageSize(),
            Sort.by("createAt").descending()
        );


        Page<Board> boards;
        if ("title".equals(searchWhat)) {
            boards = boardRepository.findByTitleContaining(keyword, sortedPageable);
        } else if ("content".equals(searchWhat)) {
            boards = boardRepository.findByContentContaining(keyword, sortedPageable);
        } else if ("user".equals(searchWhat)) {
            boards = boardRepository.findByUser_LoginIdContaining(keyword, sortedPageable);
        } else if ("category".equals(searchWhat)) {
            boards = boardRepository.findByCategoryContaining(keyword, sortedPageable);
        } else {
            boards = boardRepository.findAll(sortedPageable);
        }
        
        return boards.map(this::toDto);
    }


    public BoardDto getBoard(Long boardId) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 없습니다."));
        // 조회수 증가
        board.setViews(board.getViews() + 1);
        boardRepository.save(board);
        return toDto(board);
    }

    public BoardDto createBoard(BoardDto boardDto) {
        try{
        User user = userRepository.findById(boardDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

        Board board = new Board();
        board.setTitle(boardDto.getTitle());
        board.setContent(boardDto.getContent());
        board.setCategory(boardDto.getCategory());
        board.setUser(user);
        board.setViews(0);

        System.out.println("저장할 게시글: " + board.getTitle() + ", user=" + board.getUser().getId());

        Board saved = boardRepository.save(board);
        return toDto(saved);
        }catch (Exception e) {
        // 에러 로그 출력
        e.printStackTrace();
        throw e; // 혹은 RuntimeException으로 감싸서 던지기
    }
    }

    public BoardDto updateBoard(BoardDto boardDto) {
        Board board = boardRepository.findById(boardDto.getBoardid())
                .orElseThrow(() -> new IllegalArgumentException("게시글이 없습니다."));
        board.setTitle(boardDto.getTitle());
        board.setContent(boardDto.getContent());
        board.setCategory(boardDto.getCategory());
        Board updated = boardRepository.save(board);
        return toDto(updated);
    }

    
    @Transactional
    public void deleteBoard(Long boardId, Long userId) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 없습니다."));

        // 권한 체크: 작성자만 삭제 가능
        if (!board.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("삭제 권한이 없습니다.");
        }

        // 댓글 먼저 삭제 (FK 문제 방지)
        commentRepository.deleteByBoard(board);

        // 게시글 삭제
        boardRepository.delete(board);
    }


    // ================= Comment =================
    public CommentDto createComment(Long boardId, CommentDto commentDto) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 없습니다."));
        User user = userRepository.findById(commentDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("유저가 없습니다."));

        Comment comment = new Comment();
        comment.setBoard(board);
        comment.setUser(user);
        comment.setContent(commentDto.getContent());
        Comment saved = commentRepository.save(comment);

        return toCommentDto(saved);
    }

    public List<CommentDto> getCommentsByBoard(Long boardId) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 없습니다."));
        List<Comment> comments = commentRepository.findByBoardOrderByCreateAtAsc(board);
        return comments.stream().map(this::toCommentDto).collect(Collectors.toList());
    }

    public CommentDto updateComment(CommentDto commentDto) {
        Comment comment = commentRepository.findById(commentDto.getCommentID())
                .orElseThrow(() -> new IllegalArgumentException("댓글이 없습니다."));
        comment.setContent(commentDto.getContent());
        Comment updated = commentRepository.save(comment);
        return toCommentDto(updated);
    }

    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }

    // ================= DTO 변환 =================
    private BoardDto toDto(Board board) {
        BoardDto dto = new BoardDto();
        dto.setBoardid(board.getBoardID());
        dto.setTitle(board.getTitle());
        dto.setContent(board.getContent());
        dto.setCategory(board.getCategory());
        dto.setUserId(board.getUser().getId());
        dto.setNickname(board.getUser().getNickname());
        dto.setCreateAt(board.getCreateAt());           // 추가
        dto.setViews(board.getViews());
        dto.setMbti(board.getUser().getMbti() != null ? board.getUser().getMbti().getName() : "");
        return dto;
    }   


    private CommentDto toCommentDto(Comment comment) {
        CommentDto dto = new CommentDto();
        dto.setCommentID(comment.getCommentID());
        dto.setContent(comment.getContent());
        dto.setBoardId(comment.getBoard().getBoardID());
        dto.setUserId(comment.getUser().getId());
        dto.setNickname(comment.getUser().getNickname());

        if(comment.getUser().getMbti() != null){
            dto.setMbti(comment.getUser().getMbti().getName());
            dto.setMbtiUrl(comment.getUser().getMbti().getUrl());
        }

        dto.setCreateAt(comment.getCreateAt());

        return dto;
    }
}
