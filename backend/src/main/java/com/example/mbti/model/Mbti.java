package com.example.mbti.model;

import lombok.*;
import java.util.List;
import javax.persistence.*;


@Entity
@Table(name = "mbti")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Mbti {
    @Id
    @Column(name = "mbti_id")
    private Integer mbtiId;

    @Column(name = "mbti_name", length = 4, nullable = false)
    private String mbtiName;

    @Column(name = "url", nullable = false)
    private String url;

    // Mbti.java
    @OneToMany(mappedBy = "mbti")
    @com.fasterxml.jackson.annotation.JsonIgnore // ← 이 줄 추가!!
    private List<User> users;

}
