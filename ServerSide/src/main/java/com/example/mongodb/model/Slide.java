package com.example.mongodb.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "sa_silde")
public class Slide {
    @Id
    private String id;
    @Field("name-banner")
    private String nameBanner;
    @Field("bg-banner")
    private String bgBanner;

    public Slide() {

    }

    public Slide(String id, String nameBanner, String bgBanner) {
        this.id = id;
        this.nameBanner = nameBanner;
        this.bgBanner = bgBanner;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNameBanner() {
        return nameBanner;
    }

    public void setNameBanner(String nameBanner) {
        this.nameBanner = nameBanner;
    }

    public String getBgBanner() {
        return bgBanner;
    }

    public void setBgBanner(String bgBanner) {
        this.bgBanner = bgBanner;
    }
}
