package com.example.mbti.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDto {
    private Long commentID;
    private Long boardId;
    private Long userId; // User PK
    private String userName; // User loginId
    private String content;
}
