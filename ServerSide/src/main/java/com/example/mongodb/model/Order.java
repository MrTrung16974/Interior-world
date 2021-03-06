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
    @Field("shipping_address")
    private String shippingAddress;
    @Field("billing_address")
    private String billingAddress;
    @Field("payment_type")
    private String paymentType;
    @Field("phone")
    private String phone;
    @Field("email")
    private String email;
    @Field("full_name")
    private String fullName;
    @Field("note_seller")
    private String noteSeller;
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

    public String getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(String paymentType) {
        this.paymentType = paymentType;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getNoteSeller() {
        return noteSeller;
    }

    public void setNoteSeller(String noteSeller) {
        this.noteSeller = noteSeller;
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

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public String getBillingAddress() {
        return billingAddress;
    }

    public void setBillingAddress(String billingAddress) {
        this.billingAddress = billingAddress;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
