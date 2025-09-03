// src/main/java/com/example/mbti/dto/UserProfileDto.java
package com.example.mbti.dto;

import com.example.mbti.model.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.text.SimpleDateFormat;

@Getter
@Setter
@NoArgsConstructor
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

    // User → DTO 변환 생성자
    public UserProfileDto(User user) {
        this.id = user.getId();
        this.loginId = user.getLoginId();
        this.nickname = user.getNickname();
        this.email = user.getEmail();
        this.tel = user.getTel();
        this.introText = user.getIntroText();
        this.role = user.getRole();

        // 날짜 포맷팅
        if (user.getRegDate() != null) {
            this.createdAt = new SimpleDateFormat("yyyy-MM-dd HH:mm").format(user.getRegDate());
        }

        // Mbti 엔티티가 null일 수도 있으니까 안전하게 체크
        if (user.getMbti() != null) {
            this.mbtiName = user.getMbti().getName();
            this.mbtiUrl = user.getMbti().getUrl();
        }

        // lastLoginAt은 User 엔티티에 없으니까 null로 둠 (필요하면 User에 추가)
        this.lastLoginAt = null;
    }


}
