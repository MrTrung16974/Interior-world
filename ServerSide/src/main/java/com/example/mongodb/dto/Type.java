package com.example.mongodb.dto;

import org.springframework.data.mongodb.core.mapping.Field;

public class Type {
    private Integer type;
    private Integer material;
    private Integer width;
    private Integer height;
    private Integer depth;
    private Integer weight;
    private String qualityChecking;


    public Type() {

    }

    public Type(Integer type, Integer material, Integer width, Integer height, Integer depth, Integer weight, String qualityChecking) {
        this.type = type;
        this.material = material;
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.weight = weight;
        this.qualityChecking = qualityChecking;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getMaterial() {
        return material;
    }

    public void setMaterial(Integer material) {
        this.material = material;
    }

    public Integer getWidth() {
        return width;
    }

    public void setWidth(Integer width) {
        this.width = width;
    }

    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public Integer getDepth() {
        return depth;
    }

    public void setDepth(Integer depth) {
        this.depth = depth;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public String getQualityChecking() {
        return qualityChecking;
    }

    public void setQualityChecking(String qualityChecking) {
        this.qualityChecking = qualityChecking;
    }

}
