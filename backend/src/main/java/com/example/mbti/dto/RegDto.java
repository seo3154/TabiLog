package com.example.mbti.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegDto {
    private String loginId; // userid → loginId
    private String password;
    private String name;
    private String nickname;
    private Integer gender;
    private String email;
    private String tel; // phone → tel
    private String introText;
}
