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
    @Field("title-banner")
    private String titleBanner;
    @Field("content-banner")
    private String contentBanner;
    @Field("bg-banner")
    private String bgBanner;

    public Slide() {

    }

    public Slide(String nameBanner, String titleBanner, String contentBanner, String bgBanner) {
        this.nameBanner = nameBanner;
        this.titleBanner = titleBanner;
        this.contentBanner = contentBanner;
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

    public String getTitleBanner() {
        return titleBanner;
    }

    public void setTitleBanner(String titleBanner) {
        this.titleBanner = titleBanner;
    }

    public String getContentBanner() {
        return contentBanner;
    }

    public void setContentBanner(String contentBanner) {
        this.contentBanner = contentBanner;
    }

    public String getBgBanner() {
        return bgBanner;
    }

    public void setBgBanner(String bgBanner) {
        this.bgBanner = bgBanner;
    }
}
