package com.example.mongodb.dto.product;

public class Like {
    private String buyer;

    public Like(String buyer) {
        this.buyer = buyer;
    }

    public String getBuyer() {
        return buyer;
    }

    public void setBuyer(String buyer) {
        this.buyer = buyer;
    }
}
