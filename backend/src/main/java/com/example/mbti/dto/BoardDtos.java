package com.example.mbti.dto;


import lombok.*;
import java.util.Date;


public class BoardDtos {


    @Getter
    @Setter
    public static class CreateReq {
        private String title;
        private String content;
        private String category; // "전체 게시판" / "리뷰 게시판" / "Q&A 게시판"
        private String mbti;
        private Long userId; // 프론트 localStorage에서 전달
        private String userName; // 표시용 닉네임
    }


    @Getter
    @Setter
    public static class Resp {
        private Long boardId;
        private String title;
        private String content;
        private String category;
        private String mbti;
        private Long userId;
        private String userName;
        private Long views;
        private Date createdAt;
    }
}
