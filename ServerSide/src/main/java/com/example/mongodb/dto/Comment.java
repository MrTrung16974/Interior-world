package com.example.mongodb.dto;

import java.util.Date;

public class Comment {
    private String image;
    private String buyer;
    private String comtent;
    private Date createAt;

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getBuyer() {
        return buyer;
    }

    public void setBuyer(String buyer) {
        this.buyer = buyer;
    }

    public String getComtent() {
        return comtent;
    }

    public void setComtent(String comtent) {
        this.comtent = comtent;
    }

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }
}
