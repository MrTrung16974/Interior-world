package com.example.mongodb.services;

import com.example.mongodb.model.Slide;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Pattern;

@Service
public class BannerService {
    @Autowired
    MongoTemplate mongoTemplate;

    //tìm kiếm product theo name và giá tiền
    public List<Slide> advancedSearch(Slide banner){
        Query query = new Query();
        //check name tồn tài mới thêm điều kiện search
        if(!banner.getBgBanner().isEmpty() && banner.getBgBanner() != null) {
            query.addCriteria(Criteria.where("namePage").regex(Pattern.compile(Pattern.quote(banner.getBgBanner()), Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }
        List<Slide> lstBanner = mongoTemplate.find(query, Slide.class);
        return lstBanner;
    }
}
