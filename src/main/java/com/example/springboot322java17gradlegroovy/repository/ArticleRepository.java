package com.example.springboot322java17gradlegroovy.repository;

import com.example.springboot322java17gradlegroovy.entity.Article;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

public interface ArticleRepository extends CrudRepository<Article,Long> {
    @Override
    ArrayList<Article> findAll();
}
