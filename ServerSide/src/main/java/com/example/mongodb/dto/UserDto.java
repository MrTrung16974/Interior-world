package com.example.mongodb.dto;

import com.example.mongodb.model.Product;

import java.util.List;

public class UserDto {
    private String username;
    private String image;
    private String fullName;
    private String address;
    private String phone;
    private List<Product> LstFavourite;

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAddress() {
        return address;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
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
