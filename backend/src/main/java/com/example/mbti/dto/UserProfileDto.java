// src/main/java/com/example/mbti/dto/UserProfileDto.java
package com.example.mbti.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserProfileDto {
    private Long id;
    private String loginId;
    private String nickname;
    private String email;
    private String tel;
    private String introText;

    private String mbtiName; // "INFP"
    private String mbtiUrl; // MBTI 테이블의 url (없으면 null)

    private Integer role;
    private String createdAt; // REG_DATE를 YYYY-MM-DD HH:mm 형태로
    private String lastLoginAt; // 컬럼 없으면 null 리턴
}
