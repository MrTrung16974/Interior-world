package com.example.mongodb.dto;

import org.springframework.data.mongodb.core.mapping.Field;

public class Type {
    private Integer type;
    private Integer material;

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
}
