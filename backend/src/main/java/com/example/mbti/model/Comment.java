package com.example.mbti.model;


import lombok.*;
import javax.persistence.*;
import java.util.Date;


@Entity
@Table(name = "comment")
@Getter
@Setter
public class Comment {
    @Id
    @Column(name = "comment_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_comment")
    @SequenceGenerator(name = "seq_comment", sequenceName = "seq_comment", allocationSize = 1)
    private Long commentId;


    @Column(name = "board_id")
    private Long boardId;


    @Column(name = "user_id")
    private Long userId;


    @Column(name = "user_name")
    private String userName;


    @Lob
    private String content;


    @Column(name = "parent_id")
    private Long parentId; // 대댓글용


    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at")
    private Date createdAt = new Date();
}
