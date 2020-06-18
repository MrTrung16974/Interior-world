package com.example.mongodb.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "user")
public class User {
    @Id
    private String id;
    @Field("name")
    private String name;
    @Field("password")
    private String password;
    @Field("address")
    private String address;
    @Field("phone")
    private String phone;
    @Field("favourite")
    private List<Product> lstFavourite;
    @Field("roles")
    private List<String> roles;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public String getId() {
        return id;
    }

    public List<Product> getLstFavourite() {
        return lstFavourite;
    }

    public void setLstFavourite(List<Product> lstFavourite) {
        this.lstFavourite = lstFavourite;
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
}
