package com.example.mbti.service;


import com.example.mbti.dto.BoardDTO;
import com.example.mbti.dto.BoardDtos;
import com.example.mbti.model.Board;
import com.example.mbti.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;


    @Transactional(readOnly = true)
    public Page<Board> list(String category, String mbti, int page, int size) {
        String c = category == null ? "" : category;
        String m = mbti == null ? "" : mbti;
        Pageable pageable = PageRequest.of(page, size, Sort.by("boardId").descending());

        return boardRepository.findByCategoryContainingAndMbtiContainingIgnoreCase(c, m, pageable);
    }


    @Transactional
    public void create(BoardDTO dto) {

        Board board = new Board();

        board.setTitle(dto.getTitle());
        board.setContent(dto.getContent());
        board.setCategory(dto.getCategory());
        board.setMbti(dto.getMbti());
        board.setWriter(dto.getWriter());
        board.setCreatedAt(dto.getCreatedAt());

        boardRepository.save(board);
    }


    // @Transactional
    // public Board increaseViews(Long boardId) {
    // Board b = boardRepository.findById(boardId)
    // .orElseThrow(() -> new IllegalArgumentException("board not found"));
    // b.setViews(b.getViews() + 1);
    // return b;
    // }


    // @Transactional(readOnly = true)
    // public Board get(Long id) {
    // return boardRepository.findById(id)
    // .orElseThrow(() -> new IllegalArgumentException("board not found"));
    // }
}
