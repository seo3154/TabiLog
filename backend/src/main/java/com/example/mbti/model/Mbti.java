// src/main/java/com/example/mbti/model/Mbti.java
package com.example.mbti.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "MBTI")
@Getter
@Setter
public class Mbti {

    @Id
    @Column(name = "MBTI_ID")
    private Long id; // 사전에 입력된 코드 (시퀀스 사용 시 @GeneratedValue 적용)

    @Column(name = "MBTI_NAME", nullable = false, unique = true, length = 20)
    private String name; // "INFP" 등

    @Column(name = "KEYWORD", length = 200)
    private String keyword;

    @Column(name = "URL", length = 500)
    private String url; // 각 MBTI 프로필 이미지 URL (없으면 null)
}
