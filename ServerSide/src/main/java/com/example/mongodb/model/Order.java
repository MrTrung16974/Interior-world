package com.example.mongodb.model;

import com.example.mongodb.dto.product.ProductModel;
import com.example.mongodb.dto.product.Promotion;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.Id;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;
import java.util.List;

@Document(collection = "sa_order")
public class Order {
    @Id
    private String id;
    @Field("buyer")
    private String buyer;
    @Field("listProduct")
    private List<ProductModel> listProduct;
    @Field("promotion")
    private Promotion promotion;
    @Field("shipping_rates")
    private Integer shippingRates;
    @Field("total_price")
    private Double totalPrice;
    @Field("flat_rate_shipping")
    private Double flatRateShipping;
    @Field("total_product_order")
    private Integer totalProductOrder;
    @Field("createdAt")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", timezone = "Asia/Saigon")
    private Date createdAt;
    @Field("address")
    private String address;
    @Field("status")
    private Integer status;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBuyer() {
        return buyer;
    }

    public void setBuyer(String buyer) {
        this.buyer = buyer;
    }

    public List<ProductModel> getListProduct() {
        return listProduct;
    }

    public void setListProduct(List<ProductModel> listProduct) {
        this.listProduct = listProduct;
    }

    public Promotion getPromotion() {
        return promotion;
    }

    public Integer getShippingRates() {
        return shippingRates;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public Double getFlatRateShipping() {
        return flatRateShipping;
    }

    public void setFlatRateShipping(Double flatRateShipping) {
        this.flatRateShipping = flatRateShipping;
    }

    public Integer getTotalProductOrder() {
        return totalProductOrder;
    }

    public void setTotalProductOrder(Integer totalProductOrder) {
        this.totalProductOrder = totalProductOrder;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public void setShippingRates(Integer shippingRates) {
        this.shippingRates = shippingRates;
    }

    public void setPromotion(Promotion promotion) {
        this.promotion = promotion;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
