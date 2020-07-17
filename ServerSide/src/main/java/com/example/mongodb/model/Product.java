package com.example.mongodb.model;

import com.example.mongodb.dto.product.Comment;
import com.example.mongodb.dto.product.Price;
import com.example.mongodb.dto.product.Promotion;
import com.example.mongodb.dto.product.Type;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;
import java.util.List;

@Document(collection = "sa_product")
public class Product {
    @Id
    private String id;
    @Field("name")
    private String name;
    @Field("price")
    private Double price;
    @Field("price_for_color")
    private List<Price> priceForColor;
    @Field("description")
    private String description;
    @Field("long_description")
    private String longDescription;
    @Field("image")
    private List<String> image;
    @Field("comment")
    private List<Comment> comment;
    @Field("promotion")
    private Promotion promotion;
    @Field("type")
    private Type type;
    @Field("star")
    private Integer star;
    @Field("number")
    private Integer number;
    @Field("createAt")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss", timezone = "Asia/Saigon")
    private Date createAt;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public String getLongDescription() {
        return longDescription;
    }

    public void setLongDescription(String longDescription) {
        this.longDescription = longDescription;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public List<Price> getPriceForColor() {
        return priceForColor;
    }

    public void setPriceForColor(List<Price> priceForColor) {
        this.priceForColor = priceForColor;
    }

    public List<String> getImage() {
        return image;
    }

    public void setImage(List<String> image) {
        this.image = image;
    }

    public List<Comment> getComment() {
        return comment;
    }

    public void setComment(List<Comment> comment) {
        this.comment = comment;
    }

    public Promotion getPromotion() {
        return promotion;
    }

    public void setPromotion(Promotion promotion) {
        this.promotion = promotion;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public Type getType() {
        return type;
    }

    public Integer getStar() {
        return star;
    }

    public void setStar(Integer star) {
        this.star = star;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }
}
