package com.example.mongodb.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "sa_banner")
public class Banner {
    @Id
    private String id;
    @Field("link-page")
    private String linkPage;
    @Field("name-page")
    private String namePage;
    @Field("bg-banner")
    private String bgBanner;

    public Banner() {

    }

    public Banner(String linkPage, String namePage, String bgBanner) {
        this.linkPage = linkPage;
        this.namePage = namePage;
        this.bgBanner = bgBanner;
    }

    public String getLinkPage() {
        return linkPage;
    }

    public void setLinkPage(String linkPage) {
        this.linkPage = linkPage;
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
