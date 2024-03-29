package com.example.springboot322java17gradlegroovy.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity //DB가 해당 객체를 인식 가능
@NoArgsConstructor // 디폴트 생성자 추가
@AllArgsConstructor//생성자 자동생성
@ToString//toString 자동생성
@Getter// 롬복으로 게터 추가
public class Article {
    @Id //대표값 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동 생성 전략
    private Long id;
    @Column
    private String title;
    @Column
    private String content;

    public void patch(Article article) {
        if (article.title != null)
            this.title = article.title;
        if (article.content != null)
            this.content = article.content;
    }
}
