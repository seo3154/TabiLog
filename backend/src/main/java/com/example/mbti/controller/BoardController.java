package com.example.mbti.controller;


import com.example.mbti.dto.BoardDTO;
import com.example.mbti.dto.BoardDtos;
import com.example.mbti.dto.SuccessMessageDTO;
import com.example.mbti.model.Board;
import com.example.mbti.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.*;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;

    // 커뮤니티 들어가마 문제 가 생기는 이유 << 여기가 고장남
    // @GetMapping("/list")
    // public ResponseEntity<Map<String, Object>> list(@RequestParam(required = false) String
    // category,
    // @RequestParam(required = false) String mbti,
    // @RequestParam(defaultValue = "0") int page) {

    // int size = 10;
    // Pageable pageable = PageRequest.of(page, size, Sort.by("boardId").descending());


    // return boardService.list(category, mbti, page);
    // }

    @PostMapping("/create")
    public SuccessMessageDTO create(@RequestBody BoardDTO dto) {
        System.out.println(dto.getTitle());
        boardService.create(dto);
        return SuccessMessageDTO.builder().Message("게시글 작성에 성공").success(true).build();
    }

}
