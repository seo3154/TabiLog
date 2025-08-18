// example/mbti/model/User.java
package com.example.mbti.model;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "USERS")
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "USER_SEQ_GEN")
    @SequenceGenerator(name = "USER_SEQ_GEN", sequenceName = "SEQ_USERS_ID", allocationSize = 1)
    @Column(name = "USER_ID")
    private Long id;

    @Column(name = "LOGIN_ID", nullable = false, unique = true, length = 255)
    private String loginId;

    @Column(name = "PASSWORD", nullable = false, length = 255)
    private String password;

    @Column(name = "NAME", nullable = false, length = 50)
    private String name;

    @Column(name = "NICKNAME", nullable = false, unique = true, length = 50)
    private String nickname;

    @Column(name = "GENDER", nullable = false)
    private Integer gender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MBTI", foreignKey = @ForeignKey(name = "FK_USERS_MBTI"))
    private Mbti mbti;

    @Column(name = "EMAIL", nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "TEL", length = 20)
    private String tel;

    @Column(name = "INTRO_TEXT", length = 500)
    private String introText;

    @Column(name = "ROLE", nullable = false)
    private Integer role;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "REG_DATE")
    private Date regDate;
}
