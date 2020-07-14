package com.example.mongodb.config;

import org.springframework.stereotype.Component;

@Component
@org.springframework.boot.context.properties.ConfigurationProperties("ekyc.security")
public class URLAccessConfiguration {

    private java.util.List<URLAccessEntity> authorizations;
    private String ignoring;

    public java.util.List<URLAccessEntity> getAuthorizations() {
        return authorizations;
    }

    public void setAuthorizations(java.util.List<URLAccessEntity> authorizations) {
        this.authorizations = authorizations;
    }

    public String getIgnoring() {
        return ignoring;
    }

    public void setIgnoring(String ignoring) {
        this.ignoring = ignoring;
    }

}