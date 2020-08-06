package com.example.mongodb.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "sa_material")
public class Material {
    @Id
    private String id;
    @Field("icon-material")
    private String iconMaterial;
    @Field("content-material")
    private String contentMaterial;

    public Material() {

    }

    public Material(String iconMaterial, String contentMaterial) {
        this.iconMaterial = iconMaterial;
        this.contentMaterial = contentMaterial;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIconMaterial() {
        return iconMaterial;
    }

    public void setIconMaterial(String iconMaterial) {
        this.iconMaterial = iconMaterial;
    }

    public String getContentMaterial() {
        return contentMaterial;
    }

    public void setContentMaterial(String contentMaterial) {
        this.contentMaterial = contentMaterial;
    }
}
