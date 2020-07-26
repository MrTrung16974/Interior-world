package com.example.mongodb.services;

import com.example.mongodb.model.Banner;
import com.example.mongodb.model.Product;
import com.example.mongodb.repository.BannerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.repository.support.PageableExecutionUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Pattern;

@Service
public class BannerService {
    @Autowired
    MongoTemplate mongoTemplate;

    //tìm kiếm product theo name và giá tiền
    public List<Banner> advancedSearch(Banner banner){
        Query query = new Query();
        //check name tồn tài mới thêm điều kiện search
        if(!banner.getBgBanner().isEmpty() && banner.getBgBanner() != null) {
            query.addCriteria(Criteria.where("namePage").regex(Pattern.compile(Pattern.quote(banner.getBgBanner()), Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }
        List<Banner> lstBanner = mongoTemplate.find(query, Banner.class);
        return lstBanner;
    }
}
