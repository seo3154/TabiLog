package com.example.mbti.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import java.util.*;

@Getter
@Setter
public class CommentDto {
    private Long commentID;
    private Long boardId;
    private Long userId; // User PK
    private String userName; // User loginId
    private String nickname;
    private String content;
    private String mbti;
    private String mbtiUrl;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private Date createAt;
}
