package com.example.mongodb.dto.product;

public class Color {
    private String id;
    private Double priceForColor;
    private String color;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Double getPriceForColor() {
        return priceForColor;
    }

    public void setPriceForColor(Double priceForColor) {
        this.priceForColor = priceForColor;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}
