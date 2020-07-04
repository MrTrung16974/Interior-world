package com.example.mongodb.dto.product;

public class Promotion {
    private String name;
    private Integer percent;

    public String getName() {
        return name;
    }

    public Promotion() {

    }

    public Promotion(String name, Integer percent) {
        this.name = name;
        this.percent = percent;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPercent() {
        return percent;
    }

    public void setPercent(Integer percent) {
        this.percent = percent;
    }
}
