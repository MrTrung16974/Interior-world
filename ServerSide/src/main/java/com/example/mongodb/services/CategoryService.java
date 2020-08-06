package com.example.mongodb.services;

import com.example.mongodb.model.Category;
import com.example.mongodb.model.Slide;
import com.example.mongodb.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Pattern;

@Service
public class CategoryService {
    @Autowired
    MongoTemplate mongoTemplate;

    //tìm kiếm product theo name và giá tiền
    public List<Category> advancedSearch(Category category){
        Query query = new Query();
        //check name tồn tài mới thêm điều kiện search
        if(!Utils.checkNullOrEmpty(category.getContentCategory())) {
            query.addCriteria(Criteria.where("content-category").regex(Pattern.compile(Pattern.quote(category.getContentCategory()), Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }
        List<Category> lstCategory = mongoTemplate.find(query, Category.class);
        return lstCategory;
    }
}
