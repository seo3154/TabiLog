package com.example.mbti.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.*;

@Getter
@Setter
public class CommentDto{

    private Long commentID;
    private String content;
    private Date createAt;
    private Long userID;

    private List<CommentDto> children = new ArrayList<>();

}