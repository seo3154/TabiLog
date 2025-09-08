package com.example.mbti.dto;

import lombok.*;

@Getter
@Setter
@Builder
public class SuccessMessageDTO {
    String Message;
    boolean success;
}
