// src/main/java/com/example/mbti/dto/UpdateMbtiRequest.java
package com.example.mbti.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateMbtiRequest {
    private String mbtiName; // 프런트가 보내는 값 그대로 ("INFP")
}
