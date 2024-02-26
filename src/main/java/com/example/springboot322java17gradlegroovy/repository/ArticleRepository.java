package com.example.springboot322java17gradlegroovy.repository;

import com.example.springboot322java17gradlegroovy.entity.Article;
import org.springframework.data.repository.CrudRepository;

public interface ArticleRepository extends CrudRepository<Article,Long> {

}
