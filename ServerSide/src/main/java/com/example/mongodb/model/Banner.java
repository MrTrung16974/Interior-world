package com.example.mongodb.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "sa_banner")
public class Banner {
    @Id
    private String id;
    @Field("name-page")
    private String namePage;
    @Field("bg-banner")
    private String bgBanner;

    public Banner(String id, String namePage, String bgBanner) {
        this.id = id;
        this.namePage = namePage;
        this.bgBanner = bgBanner;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNamePage() {
        return namePage;
    }

    public void setNamePage(String namePage) {
        this.namePage = namePage;
    }

    public String getBgBanner() {
        return bgBanner;
    }

    public void setBgBanner(String bgBanner) {
        this.bgBanner = bgBanner;
    }
}
