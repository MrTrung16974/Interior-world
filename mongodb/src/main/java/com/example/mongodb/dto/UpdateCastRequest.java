package com.example.mongodb.dto;

import java.util.List;

public class UpdateCastRequest {
    private List<ProductCast> listProductCast;
    private String name;

    public List<ProductCast> getListProductCast() {
        return listProductCast;
    }

    public void setListProductCast(List<ProductCast> listProductCast) {
        this.listProductCast = listProductCast;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
