package com.example.mbti.model;

import lombok.*;
import javax.persistence.*;

@Entity
@Table(name = "TRAVEL",
        indexes = {@Index(name = "UK_TRAVEL_SLUG", columnList = "SLUG", unique = true)})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Travel {

    @Id
    @Column(name = "TRAVEL_ID")
    private Long travelId; // 이미 TRAVEL 테이블 PK (시퀀스 안 쓰고 수동 생성해도 됨)

    @Column(name = "SLUG", length = 200, unique = true)
    private String slug;

    // 필요하면 아래 컬럼들 추가 (nullable 허용)
    // @Column(name="TRAVEL_TITLE") private String travelTitle;
    // @Column(name="REGION") private String region;
}
