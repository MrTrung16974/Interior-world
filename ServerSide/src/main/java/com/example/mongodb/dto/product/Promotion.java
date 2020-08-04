package com.example.mongodb.dto.product;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class Promotion {
    private String name;
    private Integer percent;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss", timezone = "Asia/Saigon")
    private Date createAt;

    public String getName() {
        return name;
    }

    public Promotion() {

    }

    public Promotion(String name, Integer percent, Date createAt) {
        this.name = name;
        this.percent = percent;
        this.createAt = createAt;
    }

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
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
