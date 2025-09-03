package com.example.mbti.model;

import lombok.*;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "BOOKMARKS")
@IdClass(BookmarkId.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bookmark {

    @Id
    @Column(name = "USER_ID", nullable = false)
    private Long userId;

    @Id
    @Column(name = "TRAVEL_ID", nullable = false)
    private Long travelId;

    // 오라클 DATE 기본값 SYSDATE. DB가 채우게 둔다.
    @Column(name = "CREATED_AT", insertable = false, updatable = false)
    private LocalDateTime createdAt;
}
