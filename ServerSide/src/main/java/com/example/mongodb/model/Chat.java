package com.example.mongodb.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;
import java.util.List;

@Document(collation = "sa_chat")
public class Chat {
    @Id
    private String id;
    @Field("lst_message")
    private List<String> lstMessage;
    @Field("sender")
    private String sender;
    @Field("createAt")
    private Date createAt;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<String> getLstMessage() {
        return lstMessage;
    }

    public void setLstMessage(List<String> lstMessage) {
        this.lstMessage = lstMessage;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }
}
