package com.example.mbti.dto;


import lombok.*;
import java.util.Date;


public class CommentDtos {


    @Getter
    @Setter
    public static class CreateReq {
        private Long boardId;
        private Long userId;
        private String userName;
        private String content;
        private Long parentId; // optional
    }


    @Getter
    @Setter
    public static class Resp {
        private Long commentId;
        private Long boardId;
        private Long userId;
        private String userName;
        private String content;
        private Long parentId;
        private Date createdAt;
    }
}
