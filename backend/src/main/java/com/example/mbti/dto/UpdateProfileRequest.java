// src/main/java/com/example/mbti/dto/UpdateProfileRequest.java
package com.example.mbti.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProfileRequest {
    private String nickname;
    private String email;
    private String tel;
    private String introText;
}
