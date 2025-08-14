// model/Mbti.java
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
    private Long id;

    @Column(name = "MBTI_NAME", length = 4, nullable = false, unique = true)
    private String name;

    @Column(name = "URL", length = 255, nullable = false)
    private String url;
}
