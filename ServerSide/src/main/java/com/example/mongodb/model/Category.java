package com.example.mongodb.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "sa_category")
public class Category {
    @Id
    private String id;
    @Field("icon-category")
    private String iconcategory;
    @Field("content-category")
    private String contentcategory;

    public Category() {

    }

    public Category(String iconcategory, String contentcategory) {
        this.iconcategory = iconcategory;
        this.contentcategory = contentcategory;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIconcategory() {
        return iconcategory;
    }

    public void setIconcategory(String iconcategory) {
        this.iconcategory = iconcategory;
    }

    public String getContentcategory() {
        return contentcategory;
    }

    public void setContentcategory(String contentcategory) {
        this.contentcategory = contentcategory;
    }
}

