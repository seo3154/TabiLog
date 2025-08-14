package com.example.mbti.dto;

import lombok.*;
import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDto {
    private Long userId;
    private String loginId;
    private String name;
    private String nickname;
    private Integer gender;
    private Long mbtiId;
    private String mbtiName;
    private String mbtiUrl;
    private String email;
    private String tel;
    private String introText;
    private Integer role;
    private Date regDate;
}
