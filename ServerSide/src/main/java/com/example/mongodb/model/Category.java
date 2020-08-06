package com.example.mongodb.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "sa_category")
public class Category {
    @Id
    private String id;
    @Field("icon-category")
    private String iconCategory;
    @Field("content-category")
    private String contentCategory;

    public Category() {

    }

    public Category(String iconCategory, String contentCategory) {
        this.iconCategory = iconCategory;
        this.contentCategory = contentCategory;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIconCategory() {
        return iconCategory;
    }

    public void setIconCategory(String iconCategory) {
        this.iconCategory = iconCategory;
    }

    public String getContentCategory() {
        return contentCategory;
    }

    public void setContentCategory(String contentCategory) {
        this.contentCategory = contentCategory;
    }
}

