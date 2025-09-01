package com.example.mbti.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.*;

@Getter
@Setter
public class BoardDto{

    private Long boardID;
    private String title;
    private String content;
    private Date createAt;
    private Long userId;
    private String category;
    private Integer views;
    private Long imageID;

    private List<CommentDto> comments = new ArrayList<>();
    
}