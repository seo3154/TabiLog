package com.example.mbti.model;


import lombok.*;
import javax.persistence.*;
import java.util.Date;


@Entity
@Table(name = "board")
@Getter
@Setter
public class Board {
    @Id
    @Column(name = "board_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_board")
    @SequenceGenerator(name = "seq_board", sequenceName = "seq_board", allocationSize = 1)
    private Long boardId;

    private String title;

    @Lob
    private String content;

    public enum CategoryType {
        ALL, REVIEW, QUESTION
    };

    private CategoryType category; // 전체 게시판 / 리뷰 게시판 / Q&A 게시판

    private String mbti; // 게시글 작성자의 MBTI (필터용)

    @Column(name = "writer")
    private String writer; // 작성자 표시명

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at")
    private Date createdAt = new Date();
}
