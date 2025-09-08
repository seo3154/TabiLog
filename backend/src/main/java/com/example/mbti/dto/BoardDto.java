package com.example.mbti.dto;


import java.sql.Date;
import com.example.mbti.model.Board.CategoryType;
import lombok.*;

@Getter
@Setter
public class BoardDTO {
    private String title;

    private String content;

    private CategoryType category; // 전체 게시판 / 리뷰 게시판 / Q&A 게시판

    private String mbti; // 게시글 작성자의 MBTI (필터용)

    private String writer; // 작성자 표시명

    private Date createdAt;
}
