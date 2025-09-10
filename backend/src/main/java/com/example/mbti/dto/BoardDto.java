package com.example.mbti.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.*;

@Getter
@Setter
public class BoardDto {

    private Long boardid; // Board PK
    private String title;
    private String content;
    private Date createAt;
    private Long userId; // User PK
    private String nickname;
    private String category;
    private Integer views;
    private Long imageID;
    private String mbti;

    private List<CommentDto> comments = new ArrayList<>();
    
}
