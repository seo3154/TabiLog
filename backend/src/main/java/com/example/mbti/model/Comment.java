package com.example.mbti.model;

import javax.persistence.*;
import java.util.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "COMMENTS")
@Getter
@Setter
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "comment_seq_gen")
    @SequenceGenerator(name = "comment_seq_gen", sequenceName = "COMMENT_SEQ", allocationSize = 1)
    @Column(name = "comment_id", nullable = false)
    private Long commentID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id", nullable = false)
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "content", nullable = false)
    @Lob
    private String content;

    @Column(name = "create_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Comment parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> children = new ArrayList<>();

    @PrePersist
    public void prePersist() {
        if (createAt == null) {
            createAt = new Date(); // 현재 시간
        }
    }
}
