package com.example.mongodb.dto.product;

public class Price {
    private Integer color;
    private String nameColor;
    private Double priceForColor;

    public Price() {
    }

    public Price(Integer color, String nameColor, Double priceForColor) {
        this.color = color;
        this.nameColor = nameColor;
        this.priceForColor = priceForColor;
    }

    public Integer getColor() {
        return color;
    }

    public void setColor(Integer color) {
        this.color = color;
    }

    public String getNameColor() {
        return nameColor;
    }

    public void setNameColor(String nameColor) {
        this.nameColor = nameColor;
    }

    public Double getPriceForColor() {
        return priceForColor;
    }

    public void setPriceForColor(Double priceForColor) {
        this.priceForColor = priceForColor;
    }
}

