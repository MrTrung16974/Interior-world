package com.example.mongodb.dto;

import com.example.mongodb.model.Product;

import java.util.List;

public class UserDto {
    private String id;
    private String name;
    private String address;
    private String phone;
    private List<Product> LstFavourite;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<Product> getLstFavourite() {
        return LstFavourite;
    }

    public void setLstFavourite(List<Product> lstFavourite) {
        LstFavourite = lstFavourite;
    }
}
