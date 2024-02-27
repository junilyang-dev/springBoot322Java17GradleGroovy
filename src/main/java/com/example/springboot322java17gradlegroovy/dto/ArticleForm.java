package com.example.springboot322java17gradlegroovy.dto;

import com.example.springboot322java17gradlegroovy.entity.Article;
import lombok.AllArgsConstructor;
import lombok.ToString;

@AllArgsConstructor//생성자 자동생성
@ToString//toString 자동생성
public class ArticleForm {
    private String title;
    private String content;

    /*public ArticleForm(String title, String content) {
        this.title = title;
        this.content = content;
    }*/

    /*@Override
    public String toString() {
        return "ArticleForm{" +
                "title='" + title + '\'' +
                ", content='" + content + '\'' +
                '}';
    }*/

    public Article toEntity() {
        return new Article(null,title,content);
    }
}
