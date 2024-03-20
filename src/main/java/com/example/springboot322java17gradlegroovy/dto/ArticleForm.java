package com.example.springboot322java17gradlegroovy.dto;

import com.example.springboot322java17gradlegroovy.entity.Article;
import lombok.AllArgsConstructor;
import lombok.ToString;

@AllArgsConstructor//생성자 자동생성
@ToString//toString 자동생성
public class ArticleForm {
    private Long id;
    private String title;
    private String content;

    public Article toEntity() {
        return new Article(id, title, content);
    }
}
